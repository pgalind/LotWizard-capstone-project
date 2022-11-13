// This is the actual log in form, using Formik
import React from 'react';
import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import FormInput from '../components/ProfileField';
import FormLink from '../components/FormLink';
import SubmitButton from '../components/SubmitButton';
import ExitButton from '../components/ExitButton';
import useValidationSchema from '../hooks/useValidationSchema';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const { loginSchema } = useValidationSchema();
  const { login } = useAuth();

  return (
    <div className="p-10">
      <ExitButton />
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={login}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          isSubmitting,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form
            className="flex flex-col items-center w-[300px] min-w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold text-2xl mb-6 text-center">Sign in</h1>
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
              <FormLink href="/register">
                Don't have an account? Register.
              </FormLink>
            </FormSection>

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
    </div>
  );
}
