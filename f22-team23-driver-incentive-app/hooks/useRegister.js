// Handles user registration and verification

import { useRouter } from 'next/router';

export default function useRegister() {
  const router = useRouter();
  {
    /* 
  This method controls what happens when the registration form is submitted.
  We use fetch() to asynchronously make a request to the api/register endpoint and pass all the form values.
  If the request is successful, redirect to the confirm page; if not, print error in console and set setSubmitting = false.
  */
  }
  const register = (values, { setSubmitting }) => {
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // setting Content-Type to application/json helps Next.js parse the request body
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        // if registration is successful, redirect to confirmation page
        router.push(
          {
            pathname: '/confirm',
            query: { username: values?.username },
          },
          '/confirm'
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // request from api/confirm/index endpoint
  const confirm = (values, { setSubmitting }) => {
    fetch('/api/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        // if confirmation is successful, redirect to login page
        router.push(
          {
            pathname: '/login',
            query: { confirmed: true },
          },
          '/login'
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return {
    register,
    confirm,
  };
}
