// Handles user sign in and password reset

import { useRouter } from 'next/router';

export default function useAuth() {
  const router = useRouter();
  {
    /* 
  This method controls what happens when the log-in form is submitted.
  We use fetch() to asynchronously make a request to the api/login endpoint and pass all the form values.
  If the request is successful, trigger the confirm api; if not, print error in console and set setSubmitting = false.
  */
  }
  const login = (values, { setSubmitting }) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        // AWS sends a confirmation email automatically; if verification fails then catch error below
      })
      .then((data) => {
        console.log(data);
      })
      .catch(async (err) => {
        const responseData = await err.json();
        // If the user is not verified, manually request api/confirm/send endpoint to resend email confirmation
        if (responseData?.message?.includes('UserNotConfirmedException:')) {
          await fetch('/api/confirm/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: values.username }),
          });
          // if confirmation is successful, redirect to confirm page
          await router.push(
            {
              pathname: '/confirm',
              query: { username: values.username },
            },
            '/confirm'
          );
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const resetPasswordRequest = (values, { setSubmitting }) => {
    // Send the password reset code
  };

  const resetPassword = (values, { setSubmitting }) => {
    // Send request to reset password
  };

  return {
    login,
    resetPasswordRequest,
    resetPassword,
  };
}
