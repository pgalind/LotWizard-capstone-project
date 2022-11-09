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

  /*useEffect(() => {
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
  }); */

  return (
    <div className="p-10 mx-auto">
      <ExitButton />

      <h1 className="font-bold text-xl mb-6">{user.name}'s Shopping Cart</h1>

    </div>
  );
}
