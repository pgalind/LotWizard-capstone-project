// This page will be viewed by a driver when they are choosing a sponsor to apply to

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import user from '../services/user';
import axios from 'axios';
import { useFormik } from 'formik';
import SubmitButton from '../components/SubmitButton';
import FormSection from '../components/FormSection';
import FormInput from '../components/FormInput';
import ExitButton from '../components/ExitButton';

export default function userProfile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sponsors, setSponsors] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios
      .post('/api/getSponsorList')
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setSponsors(response.data);
        setError('');
      })
      .catch((err) => {
        setLoading(false);
        setSponsors();
        setError('Could not retrieve Sponsor List');
        console.log(error);
      });
  }, []);

  const options = sponsors.map((val, key) => {
    return {
      value: key,
      label: val['SponsorCompany'],
    };
  });

  /*const options = [
    { value: 'developer', label: 'Software Developer' },
    { value: 'chef', label: 'Chef' },
    { value: 'enginner', label: 'Enginner' },
    { value: 'painter', label: 'Painter' }
  
  ]*/

  const formik = useFormik({
    initialValues: {
      sponsorToApply: '',
      reason: '',
    },
    onSubmit: (values, actions) => {
      //alert(JSON.stringify(values, null, 2)); // TODO: axios post to send application to sponsor
      console.log('Reason: ' + values.reason);
      console.log('Sponsor: ' + values.sponsorToApply);
      let data = {
        driver: user.name,
        reason: values.reason,
        sponsor: values.sponsorToApply,
      };
      axios.post('/api/sendDriverApplication', data).then((res) => {
        actions.setSubmitting(false);
      });
    },
  });

  if (loading) {
    return <div>Loading . . .</div>;
  }
  return (
    <div className="p-10 mx-auto">
      <ExitButton />

      <h1 className="font-bold text-xl mb-6">Apply to a Sponsor!</h1>

      <table>
        <thead>
          <tr>
            <th>List of Sponsor Companies</th>
          </tr>
        </thead>
        <tbody>
          {sponsors.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val['SponsorCompany']}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <form
        className="flex flex-col items-center w-[300px] min-w-full"
        onSubmit={formik.handleSubmit}
      >
        <FormSection>
          <Select 
            options={options} 
            onChange={value=>formik.setFieldValue('sponsorToApply',value.label)}
            value={formik.values.sponsorToApply}/>
        </FormSection>

        <FormSection>
          <FormInput
            label="Reason"
            type="text"
            name="reason"
            onChange={formik.handleChange}
            value={formik.values.reason}
          />
        </FormSection>

        <SubmitButton isSubmitting={isSubmitting}></SubmitButton>
      </form>
    </div>
  );
}
