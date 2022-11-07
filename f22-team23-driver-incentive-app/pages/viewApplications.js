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
  const [applications, setApplications] = useState();
  const [isSubmitting, setSubmitting] = useState(false);

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
          <th>Driver</th>
          <th>Reason</th>
          <th>Decision</th>
          <th>Submit</th>
        </tr>
        {applications.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val['DriverID']}</td>
              <td>{val['Application_Reason']}</td>
              <td>
              <FormSection name={key}>
                <Select 
                    options={options} 
                    onChange={value=>formik.setFieldValue('decision',value.label)}
                />
               </FormSection>
                </td>
              <td><button className="p-2 hover:text-blue-600" onClick={() => submitDecision(val['id'], formik.values.decision)}>Submit</button></td>
            </tr>
          );
        })}
      </table>


    </div>
  );
}
