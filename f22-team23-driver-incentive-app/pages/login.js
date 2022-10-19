// This is the actual log in form, using Formik

import { Formik } from 'formik';
import FormSection from '../components/FormSection';
import FormInput from '../components/FormInput';
import FormLink from '../components/FormLink';
import SubmitButton from '../components/SubmitButton';
import useValidationSchema from '../hooks/useValidationSchema';
import { useRouter } from 'next/router';
import Link from 'next/link';
import signIn from '../hooks/signIn';
import user from '../services/user';

const Login = () => {
  const router = useRouter();
  const { success } = router.query;
  const { loginSchema } = useValidationSchema();

  return (
    <div className="p-10">
      <Link href="../">Exit Sign in</Link>
      {success === 'true' && (
        <div className="pt-10 pb-10 color-green-300">You're signed up!</div>
      )}
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={signIn}
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
};

export default Login;
