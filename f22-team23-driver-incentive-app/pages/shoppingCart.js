// Page for the Driver to view their shopping cart

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
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sponsors, setSponsors] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);


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

  return (
    <div className="p-10 mx-auto">
      <ExitButton />

      <h1 className="font-bold text-xl mb-6">{user.name}'s Shopping Cart</h1>

    </div>
  );
}
