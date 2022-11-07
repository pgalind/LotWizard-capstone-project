import React, { useState, useEffect } from 'react';
import axios from 'axios';
import user from '../services/user';
import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import ProfileField from '../components/ProfileField';
import SubmitButton from '../components/SubmitButton';
import newSponsor from '../hooks/newSponsor';
import ExitButton from './ExitButton';

export default function CreateSponsorComponent() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [post, setPost] = useState({});
    const [options, setOptions] = useState();
    const userNames = []

  useEffect(() => {
    axios
      .post('/api/getAllDrivers', {})
      .then((response) => {
        //response.data is an array of objects
        //each object has a FirstName key with a string name
        console.log(response);
        userNames.push(
            <option value="" label="select a username">
                Select a role{" "}
            </option>
        )
        for (var index=0; index < response.data.length; index++){
            var user = response.data[index].UserName
            userNames.push(
                <option key={user} value={user} label={user}>
                    {user}
                </option>
            )
        }
        console.log(options)
        setOptions(userNames);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Does exist error : ' + error);
        setError('User not found');
      });
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <ExitButton />
      <Formik
        initialValues={{
            
        }}
        //onSubmit={handler function to add values to db}
        // this is for testing purposes --> form values are displayed in a popup alert
        onSubmit={newSponsor}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSaving, values, handleBlur, handleSubmit, handleChange }) => (
          <form
            className="flex flex-col items-center w-[300px] min-w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center font-bold text-xl mb-6">
              Create a New Sponsor
            </h1>

            <FormSection>
              <ProfileField
                label="Sponsor Name:"
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormSection>

            <FormSection>
                <div className="flex mr-4 pb-2">
                    <span className="block m-2">
                        <label htmlFor="Role">Sponsor Admin:</label>
                    </span>

                    <select
                        className="py-1 px-2 bg-slate-100 rounded-md"
                        name="user"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        {options}
                    </select>
                </div>
            </FormSection>

            <SubmitButton isSaving={isSaving} />
          </form>
        )}
      </Formik>
    </div>
  );
}
