import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import user from '../services/user';
import axios from 'axios';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
//import getPoints from '../hooks/getUserPoints';

export default function userProfile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [points, setPoints] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    axios
      .post('/api/queryUserPoints', {
        userName: user.name,
      })
      .then((response) => {
        setLoading(false);
        setPoints(response.data[0]['Points']);
        setRole(response.data[0]['Role']);
        setError('');
        user.points = response.data[0]['Points'];
        user.role = response.data[0]['Role'];
        console.log(response.data);
        console.log('POINTS: ' + user.points);
      })
      .catch((error) => {
        setLoading(false);
        setPoints();
        setError('Could not retrieve points for user');
        console.log(error);
      });
  }, []);

    if (loading) {
        return <div>Loading . . .</div>
    } else if (role == "Driver") {
        return (
            <>

            <div className="p-10">
                <Link href='../'>
                    <a className="p-2 hover:text-blue-400">Exit Profile</a>
                </Link>

                <p>
                    {user.name}'s {role} Profile
                </p>

                <p>
                    Points Available: {points}
                </p>

                <Link href='pointHistory'>
                    <a className="p-2 hover:text-blue-400">View Point History</a>
                </Link>

                <p></p>
                <Link href='sponsorList'>
                    <a className="p-2 hover:text-blue-400">Apply to a Sponsor</a>
                </Link>

                <p></p>

                <Link href='profileData'>
                    <a className="p-2 hover:text-blue-400">Change User Info</a>
                </Link>
            </div>
            </>
        )
    } else if (role == "Sponsor") {
        return (
            <>

            <div className="p-10">
                <Link href='../'>
                    <a className="p-2 hover:text-blue-400">Exit Profile</a>
                </Link>

                <p>
                    {user.name}'s {role} Profile
                </p>

                <Link href='viewApplications'>
                    <a className="p-2 hover:text-blue-400">View Applications</a>
                </Link>

                <p></p>

                <Link href='profileData'>
                    <a className="p-2 hover:text-blue-400">Change User Info</a>
                </Link>
            </div>
            </>
        )
    }
    
}
