import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import user from '../services/user'
import getPoints from '../hooks/getUserPoints';



export default function userProfile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [post, setPost] = useState({});
    const points = 0;

    useEffect(() => {
        getPoints().then((response) => {
            setLoading(false);
            setPost(response.data);
            setError('');
            console.log(response);
            console.log("POINTS: " + points);
        })
        .catch((error) => {
            setLoading(false);
            setPost({});
            setError("Could not retrieve points for user");
            console.log(error);
        });
    }, []);
    return Object.keys(post).length ? (
        <div className="p-10">
            <Link href='../'>Exit Profile</Link>

            <p>
                {user.name}'s Profile
            </p>

            <p>
                Points Available: {points}
            </p>

            <Link href='profile'>Change User Info</Link>
        </div>
    ) : (
        <div>Loading . . .</div>
    );
    
}