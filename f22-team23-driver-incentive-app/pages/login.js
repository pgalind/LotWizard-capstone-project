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
import { useEffect } from 'react';
import user from '../services/user';

const Login = () => {
  const router = useRouter();
  const { success } = router.query;
  const { loginSchema } = useValidationSchema();

  return (
    <div>
      <span className="p-4">
        <Link href="../">Exit SignIn</Link>
      </span>
      <div className="flex items-center justify-center">
        {success === 'true' && (
          <div className="pt-10 pb-10 color-green-300">You're signed up!</div>
        )}
        </Formik>
    </div>
  );
};

export default Login;
