// This is the actual registration form
// Needs to have Formik installed --  npm install formik --save
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import ProfileField from '../components/ProfileField';
import FormLink from '../components/FormLink';
import SubmitButton from '../components/SubmitButton';
import ExitButton from '../components/ExitButton';
import useAuth from '../hooks/useAuth';

export default function Register() {
  const [loading, setLoading] = useState(true);
  const { register } = useAuth();

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
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          confirm_password: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (
            !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+]).{8,}$/i.test(
              values.password
            ) &&
            values.password
          ) {
            errors.password = `Invalid password. Must be 8 characters long and include: upper case [A-Z], lower case [a-z], digit [0-9] and special character [#?!@$%^&*-]`;
          }
          if (!values.confirm_password) {
            errors.confirm_password = 'Required';
          }
          if (
            values.password != values.confirm_password &&
            values.confirm_password
          ) {
            errors.confirm_password = 'Passwords do not match';
          }
          return errors;
        }}
        onSubmit={register}
        validateOnChange={true}
        validateOnBlur={true}
        validateOnMount={false}
      >
        {({
          isSubmitting,
          errors,
          values,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <form
            className="flex flex-col items-center min-w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-2xl mb-6">Welcome to LotWizard!</h1>
            <FormSection>
              <ProfileField
                label="First name:"
                type="text"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.firstName}
                error={errors?.firstName}
              />
            </FormSection>

            <FormSection>
              <ProfileField
                label="Last name:"
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.lastName}
                error={errors?.lastName}
              />
            </FormSection>

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
              <ProfileField
                label="Confirm password:"
                type="password"
                name="confirm_password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.confirm_password}
                error={errors?.confirm_password}
              />
            </FormSection>

            <FormSection>
              <FormLink href="/login">Already have an account? Log in</FormLink>
            </FormSection>

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
    </div>
  );
}
