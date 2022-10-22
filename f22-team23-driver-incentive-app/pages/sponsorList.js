// This page will be viewed by a driver when they are choosing a sponsor to apply to

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import user from '../services/user'
import axios from "axios"
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
            //console.log("Response: " + response.headers);
            console.log(response.data);
            console.log(response.data[0]);
            console.log("LENGTH: " + Object.keys(response.data).length);
            //console.log(response.data[0]);
            //console.log(response.data[1]);
        })
        .catch((error) => {
            setLoading(false);
            setSponsors();
            setError("Could not retrieve Sponsor List");
            console.log(error);
        });
    }, []);

    if (loading) {
        return <div>Loading . . .</div>
    }
    return (
        <div className="p-10">
            <Link href='../'>Exit</Link>

            <p>
                {user.name}'s Point History
            </p>

            <table>
                <tr>
                    <th>Sponsor Company</th>
                </tr>
                {sponsors.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td>{val['SponsorCompany']}</td>
                        </tr>
                    )
                })}
        </table>

        </div>
    );
    
}