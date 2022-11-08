// The view for a driver to view their application status and history
// This page will be viewed by a driver when they are choosing a sponsor to apply to

import React, { useState, useEffect } from 'react';
import user from '../services/user';
import axios from 'axios';
import { useFormik } from 'formik';
import ExitButton from '../components/ExitButton';
import 'reactjs-popup/dist/index.css';
import FormSection from '../components/FormSection';
import Select from 'react-select';
import SubmitButton from '../components/SubmitButton';

export default function userProfile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openApplications, setOpenApplications] = useState();
  const [pastApplications, setPastApplications] = useState();

  useEffect(() => {
    let data = { 
        driverUserName : user.name, 
        operator : '='
    };
    axios
      .post('/api/getDriverApplicationHistory', data)
      .then((response) => {
        setOpenApplications(response.data);
        setError('');
        data.operator = '<>'
        axios
          .post('/api/getDriverApplicationHistory', data)
          .then((response) => {
            setLoading(false);
            setPastApplications(response.data)
          })
        
      })
      .catch((error) => {
        setLoading(false);
        setOpenApplications();
        setError('Could not retrieve Application List');
        console.log(error);
      });
  }, []);

  // Options for sponsor to accept or reject individual applications
  const options = [
    { value: 'accepted', label: 'Accept' },
    { value: 'rejected', label: 'Reject' }
  ]

  const formik = useFormik({
    initialValues: {
      decision: 'Undecided',
    },
    onSubmit: (values, actions) => {
      console.log('Decision: ' + values.decision);
      let data = {
        sponsor: user.name,
        decision: values.decision
      };
      /*axios.post('/api/sendDriverApplication', data).then((res) => {
        actions.setSubmitting(false);
      });*/
    },
  });

  function submitDecision(id, decision) {
    console.log(id + " : " + decision)
    let data = { id : id,
                  decision : decision };
    axios.post('/api/decideApplication', data)
          .then((response) => console.log(response));
  }


  if (loading) {
    return <div>Loading . . .</div>;
  }
  return (
    <div className="p-10">
      <ExitButton />

      <h1 className="font-bold text-xl mb-6">Open Applications</h1>

      <form
        className="flex flex-col items-center w-[300px] min-w-full"
        onSubmit={formik.handleSubmit}
      ></form>

      <table>
        <tr>
          <th>Sponsor</th>
          <th>Reason</th>
          <th>Decision</th>
        </tr>
        {openApplications.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val['SponsorID']}</td>
              <td>{val['Application_Reason']}</td>
              <td>{val['Decision']}</td>
            </tr>
          );
        })}
      </table>

      <p></p>
      <h2 className="font-bold text-xl mb-6">Past Applications</h2>
      <table>
        <tr>
          <th>Sponsor</th>
          <th>Reason</th>
          <th>Decision</th>
        </tr>
        {pastApplications.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val['SponsorID']}</td>
              <td>{val['Application_Reason']}</td>
              <td>{val['Decision']}</td>
            </tr>
          );
        })}
       </table>

    </div>
  );
}
