import React from 'react';
import Link from 'next/link';
import user from '../services/user'
import getPoints from '../hooks/getUserPoints';



export default function userProfile() {
    const points = 0;

    return (
        <div className="p-10">
            <Link href='../'>Exit Profile</Link>

            <p>
                {user.name}'s Profile
            </p>

            <p>
                Points Available: {getPoints()}
            </p>
        </div>
    );
}