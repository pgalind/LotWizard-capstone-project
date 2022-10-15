import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import user from '../services/user'
import axios from "axios"
//import getPoints from '../hooks/getUserPoints';


export default function userProfile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pointHistory, setPointHistory] = useState();

    useEffect(() => {
        axios.post('/api/getDriverPointHistory', {
            userName : user.name
        }).then((response) => {
            setLoading(false);
            setPointHistory(response.data);
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
            setPointHistory();
            setError("Could not retrieve point history for user");
            console.log(error);
        });
    }, []);

    if (loading) {
        return <div>Loading . . .</div>
    }
    return (
        <div className="p-10">
            <Link href='../'>Exit Point History</Link>

            <p>
                {user.name}'s Point History
            </p>

            <table>
                <tr>
                    <th>Point Change</th>
                    <th>Reason</th>
                </tr>
                {pointHistory.map((val, key) => {
                    return (
                        <tr key={key}>
                        <td>{val['PointChange']}</td>
                        <td>{val['Reason']}</td>
                        </tr>
                    )
                })}
        </table>

        </div>
    );
    
}