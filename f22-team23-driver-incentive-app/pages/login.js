// This is the actual log in form, using Formik
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import FormSection from '../components/FormSection';
import ProfileField from '../components/ProfileField';
import FormLink from '../components/FormLink';
import SubmitButton from '../components/SubmitButton';
import ExitButton from '../components/ExitButton';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const [loading, setLoading] = useState(true);
  const { login } = useAuth();

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
          username: '',
          password: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={login}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={false}
      >
        {({
          isSubmitting,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form
            className="flex flex-col items-center min-w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-2xl mb-6 text-center">Sign in</h1>
            <FormSection>
              <ProfileField
                label="Username:"
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.username}
                error={errors?.username}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Password:"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.password}
                error={errors?.password}
              />
            </FormSection>

            <FormSection>
              <FormLink href="/register">
                Don't have an account? Register.
              </FormLink>
            </FormSection>

            <SubmitButton isSubmitting={isSubmitting} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
