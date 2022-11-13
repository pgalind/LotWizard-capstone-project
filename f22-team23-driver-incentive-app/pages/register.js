// This is the actual registration form
// Needs to have Formik installed --  npm install formik --save
import React, { useState } from 'react';
import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import FormInput from '../components/ProfileField';
import FormLink from '../components/FormLink';
import SubmitButton from '../components/SubmitButton';
import ExitButton from '../components/ExitButton';
import useValidationSchema from '../hooks/useValidationSchema';
import useAuth from '../hooks/useAuth';

export default function Register() {
  const { registerSchema } = useValidationSchema();
  const { register } = useAuth();
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
        validationSchema={registerSchema}
        onSubmit={register}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
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
            className="flex flex-col items-center w-[300px] min-w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-2xl mb-6">Welcome to LotWizard!</h1>
            <FormSection>
              <FormInput
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
              <FormInput
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
              <FormInput
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
              <FormInput
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
              <FormInput
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
