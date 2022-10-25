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
    return <div>Loading . . .</div>;
  }
  return (
    <div className="p-10">
      <Link href="../">
        <Button startIcon={<KeyboardReturnIcon color="action" />}>
          Exit Profile
        </Button>
      </Link>

      <p>
        {user.name}'s {role} Profile
      </p>

      <p>Points Available: {points}</p>

      <Link href="pointHistory">View Point History</Link>

      <p></p>

      <Link href="profileData">Change User Info</Link>
    </div>
  );
}
