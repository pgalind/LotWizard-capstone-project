// This page will be viewed by a driver when they are choosing a sponsor to apply to

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import user from '../services/user';
import axios from 'axios';
import { useFormik } from 'formik';
import ExitButton from '../components/ExitButton';
//import getPoints from '../hooks/getUserPoints';

export default function userProfile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState();

  useEffect(() => {
    let data = { sponsorUserName: user.name };
    axios
      .post('/api/getApplicationList', data)
      .then((response) => {
        setLoading(false);
        setApplications(response.data);
        setError('');
      })
      .catch((error) => {
        setLoading(false);
        setSponsors();
        setError('Could not retrieve Application List');
        console.log(error);
      });
  }, []);

  /*const formik = useFormik({
        initialValues: {
          sponsorToApply: '',
          reason: '',
        },
        onSubmit: values => {
          //alert(JSON.stringify(values, null, 2)); // TODO: axios post to send application to sponsor
          console.log("Reason: " + values.reason)
          console.log("Sponsor: " + values.sponsorToApply)
          let data = { driver: user.name,
                        reason: values.reason,
                        sponsor: values.sponsorToApply };
          axios.post('/api/sendDriverApplication', data).then
        },
      });*/

  if (loading) {
    return <div>Loading . . .</div>;
  }
  return (
    <div className="p-10">
      <ExitButton />

      <h1 className="font-bold text-xl mb-6">Apply to a Sponsor</h1>

      <table>
        <tr>
          <th>Driver</th>
          <th>Reason</th>
        </tr>
        {applications.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val['DriverID']}</td>
              <td>{val['Application_Reason']}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
