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
    <div className="p-10">
      <Link href="../">Exit Registration</Link>
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
                label="First name"
                type="text"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.firstName}
                isError="true"
                error={errors?.firstName}
              />
            </FormSection>

            <FormSection>
              <FormInput
                label="Last name"
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.lastName}
                isError="true"
                error={errors?.lastName}
              />
            </FormSection>

            <FormSection>
              <FormInput
                label="Username"
                type="text"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.username}
                isError="true"
                error={errors?.username}
              />
            </FormSection>

            <FormSection>
              <FormInput
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.email}
                isError="true"
                error={errors?.email}
              />
            </FormSection>

            <FormSection>
              <FormInput
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.password}
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
                value={values?.confirm_password}
                isError="true"
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
};

export default Register;
