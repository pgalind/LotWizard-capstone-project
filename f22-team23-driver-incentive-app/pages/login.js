// This is the actual log in form, using Formik

import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import FormInput from '../components/FormInput';
import FormLink from '../components/FormLink';
import SubmitButton from '../components/SubmitButton';
import useAuth from '../hooks/useAuth';
import useValidationSchema from '../hooks/useValidationSchema';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const { success } = router.query;

  const { loginSchema } = useValidationSchema();
  const { login } = useAuth(); // onSubmit will call the login method in hooks/useAuth.js

  return (
    <div className="p-10">
      {success === 'true' && (
        <div className="pt-10 pb-10 color-green-300">You're signed up!</div>
      )}
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
          <form onSubmit={handleSubmit}>
            <FormSection>
              <FormInput
                label="Username"
                type="text"
                name="username"
                placeholder="Username or email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.username}
                isError="true"
                error={errors?.username}
              />
            </FormSection>

            <FormSection>
              <FormInput
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.password}
                isError="true"
                error={errors?.password}
              />
            </FormSection>

            <FormSection>
              <FormLink href="/register">
                "Don't have an account? Register.
              </FormLink>
            </FormSection>

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        )}
      </Formik>
    </div>
  );
}
