import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import user from '../services/user'
import axios from "axios"
//import getPoints from '../hooks/getUserPoints';



export default function userProfile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [points, setPoints] = useState();

    useEffect(() => {
        axios.post('/api/queryUserPoints', {
            userName : user.name
        }).then((response) => {
            setLoading(false);
            setPoints(response.data);
            setError('');
            user.points = points
            console.log(response);
            console.log("POINTS: " + user.points);
        })
        .catch((error) => {
            setLoading(false);
            setPoints();
            setError("Could not retrieve points for user");
            console.log(error);
        });
    }, []);

    if (loading) {
        return <div>Loading . . .</div>
    }
    return (
        <div className="p-10">
            <Link href='../'>Exit Profile</Link>

            <p>
                {user.name}'s Profile
            </p>

            <p>
                Points Available: {points}
            </p>

            <Link href='profileData'>Change User Info</Link>
        </div>
    );
    
}