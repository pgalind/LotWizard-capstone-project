// This is the actual registration form
// Needs to have Formik installed --  npm install formik --save
import React from 'react';
import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import FormInput from '../components/FormInput';
import FormLink from '../components/FormLink';
import SubmitButton from '../components/SubmitButton';
import useValidationSchema from '../hooks/useValidationSchema';
import registerAuth from '../hooks/registerAuth';
import Link from 'next/link';

const Register = () => {
  const { registerSchema } = useValidationSchema();

  return (
    <div>
      <span className="p-4">
        <Link href="../">Exit Registration</Link>
      </span>
      <div className="flex items-center justify-center">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirm_password: '',
          }}
          validationSchema={registerSchema}
          onSubmit={registerAuth}
          /* this is for testing purposes --> form values are displayed in a popup alert
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
        */
          validateOnMount={false}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({
            isSubmitting,
            errors,
            values,
            handleBlur,
            handleSubmit,
            handleChange,
          }) => (
            <form className="max-w-full p-10" onSubmit={handleSubmit}>
              <h1 className="text-center font-bold text-2xl mb-6">
                Welcome to LotWizard!
              </h1>
              <FormSection>
                <FormInput
                  label="First name"
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError="true"
                  error={errors?.firstName}
                  value={values?.firstName}
                />
                <FormInput
                  label="Last name"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError="true"
                  error={errors?.lastName}
                  value={values?.lastName}
                />
              </FormSection>

              <FormSection>
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError="true"
                  error={errors?.email}
                  value={values?.email}
                />
              </FormSection>

              <FormSection>
                <FormInput
                  label="Username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError="true"
                  error={errors?.username}
                  value={values?.username}
                />
              </FormSection>

              <FormSection>
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError="true"
                  error={errors?.password}
                />
              </FormSection>

              <FormSection>
                <FormInput
                  label="Confirm password"
                  type="password"
                  name="confirm_password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError="true"
                  error={errors?.confirm_password}
                />
              </FormSection>

              <SubmitButton isSubmitting={isSubmitting} />
            </form>
          )}
        </Formik>
      </div>
  );
};

export default Register;
