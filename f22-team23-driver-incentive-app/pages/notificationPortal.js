import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import user from '../services/user';
import ExitButton from '../components/ExitButton';
import axios from 'axios';

export default function notificationPortal() {

    const [pointAlerts, setPointAlerts] = useState(0);
    const [applicationAlerts, setApplicationAlerts] = useState(0);

    useEffect(() => {
      axios.post('/api/getDriverPointAlertCount', { userName: user.name })
        .then((response) => {
          console.log(response.data[0]['COUNT(*)'])
          if (response.data[0]['COUNT(*)'] != 0) {
            //notificationColor = 'red';
            setPointAlerts(response.data[0]['COUNT(*)']);
          } else {
            //notificationColor = 'blue';
            setPointAlerts(0);
          }
          axios.post('/api/getDriverApplicationAlertCount', { userName: user.name })
            .then((response) => {
              console.log(response.data)
              if (response.data[0]['COUNT(*)'] != 0) {
                //notificationColor = 'red';
                setApplicationAlerts(response.data[0]['COUNT(*)']);
              } else {
                //notificationColor = 'blue';
                setApplicationAlerts(0);
              }
              axios
                .post('/api/clearAlerts', {
                  userName: user.name,
                })
                .then((response) => {
                  console.log(response);
                });
            })
        })
        .catch((error) => {
          setError('Could not retrieve point history for user');
          console.log(error);
        });
    }, []);
  return (
    <div className="p-10">
      <ExitButton />

      <h1 className="font-bold text-xl mb-6">{user.name}'s Notification Portal</h1>

      <Link href="/pointHistory"><a className="p-2 hover:text-blue-600">{pointAlerts} Point Alerts</a></Link>
      <p></p>
      <Link href="/driverApplicationHistory"><a className="p-2 hover:text-blue-600">{applicationAlerts} Application Alerts</a></Link>
    </div>
  );
}
