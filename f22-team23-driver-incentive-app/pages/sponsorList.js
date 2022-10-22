// This page will be viewed by a driver when they are choosing a sponsor to apply to

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import user from '../services/user'
import axios from "axios"
import { useFormik } from 'formik';
//import getPoints from '../hooks/getUserPoints';


export default function userProfile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sponsors, setSponsors] = useState();


    useEffect(() => {
        axios.post('/api/getSponsorList').then((response) => {
            setLoading(false);
            setSponsors(response.data);
            setError('');
        })
        .catch((error) => {
            setLoading(false);
            setSponsors();
            setError("Could not retrieve Sponsor List");
            console.log(error);
        });
    }, []);

    const formik = useFormik({
        initialValues: {
          sponsorToApply: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2)); // TODO: axios post to send application to sponsor
        },
      });

    if (loading) {
        return <div>Loading . . .</div>
    }
    return (
        <div className="p-10">
            <Link href='../'>Exit</Link>

            <p>Apply to a Sponsor</p>

            <table>
                <tr>
                    <th>List of Sponsor Companies</th>
                </tr>
                {sponsors.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td>{val['SponsorCompany']}</td>
                        </tr>
                    )
                })}
        </table>

        <form onSubmit={formik.handleSubmit}>
            <label>Email Address</label>
            <input
                name="sponsorToApply"
                onChange={formik.handleChange}
                value={formik.values.sponsorToApply}
            />
        
            <button type="submit">Submit</button>
        </form>

        </div>
    );
    
}
