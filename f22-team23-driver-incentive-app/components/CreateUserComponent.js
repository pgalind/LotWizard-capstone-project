import React, { useState, useEffect } from 'react';
import axios from 'axios';
import user from '../services/user';
import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import ProfileField from '../components/ProfileField';
import SaveButton from '../components/SubmitButton';
import newUser from '../hooks/newUser';
import ExitButton from './ExitButton';

export default function CreateUserComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});

  useEffect(() => {
    setLoading(false);
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <ExitButton />
      <Formik
        initialValues={{
          email: '',
          username: '',
          role: '',
          password: '',
          passwordrepeat: '',
        }}
        //onSubmit={handler function to add values to db}
        // this is for testing purposes --> form values are displayed in a popup alert
        onSubmit={newUser}
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
              Create a New User
            </h1>

            <FormSection>
              <div className="flex mr-4 pb-2">
                <span className="block m-2">
                  <label htmlFor="Role">Role:</label>
                </span>

                <select
                  className="py-1 px-2 bg-slate-100 rounded-md"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" label="select a role">
                    Select a role{' '}
                  </option>
                  <option value="Driver" label="Driver">
                    Driver
                  </option>
                  <option value="Sponsor" label="Sponsor">
                    Sponsor
                  </option>
                  <option value="Admin" label="Admin">
                    Admin
                  </option>
                </select>
              </div>
            </FormSection>

            <FormSection>
              <ProfileField
                label="Email:"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Username:"
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Password:"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Confirm Password:"
                type="password"
                name="passwordrepeat"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormSection>

            <SaveButton isSaving={isSaving} />
          </form>
        )}
      </Formik>
    </div>
  );
}
