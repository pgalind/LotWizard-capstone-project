import Head from 'next/head';
import React, { useReducer } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import user from '../services/user';

// Anything inside {} is a dynamic property.

export default function Layout({ title, children }) {
  const router = useRouter();

  // ADDED BY KALEB
  const log_SignInClicked = (event) => {
    let data = { content: 'sign in attempted' };
    axios.post('/api/log_signinclicked', data).then((response) => {
      console.log(response);
    });
  };

  const signInButtonClicked = (event) => {
    log_SignInClicked(event);
    router.push('../login');
  };
  // END ADDED

  const UsersClicked = event => {
    let data={content: 'test'}
      axios.post('/api/fetchDB', data)
      .then((response) => {
        console.log(response)
      })
  }

  /*if (loading) {
    return null;
  }*/

  return (
    <>
      <Head>
        <title>{title ? title + ' - LotWizard' : 'LotWizard'}</title>
        <meta name="description" content="LotWizard website" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-8">
            <Link href="/">
              <a className="text-lg font-bold">LotWizard</a>
            </Link>

            {/* I am disabling anything that uses session variable from next-auth
            {session ? (
              <div>
                <Link href="../account">
                  <a className="p-2 hover:text-blue-600">Account</a>
                </Link>
                <button
                  className="p-2 hover:text-blue-600"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </div>
            ) : ( */}
            {console.log(`user name is ${user.name}`)}


            <div>
              <Link href="../userProfile">
                <a className="p-2 hover:text-blue-600">{user.name}</a>
              </Link>
              <Link href="../register">
                <a className="p-2 hover:text-blue-600">Register</a>
              </Link>
              <button
                className="p-2 hover:text-blue-600"
                onClick={signInButtonClicked} // CHANGED BY KALEB
              >
                Sign in
              </button>
            </div>
            {/*
            )}
            */}
          </nav>
        </header>

        <main className="container m-auto mt-8 px-8">{children}</main>
        <div>
                <button
                  className="p-2 hover:text-blue-600"
                  onClick={UsersClicked}
                >
                  Users
                </button>
              </div>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>&copy; 2022 LotWizard | All Rights Reserved</p>
        </footer>
      </div>
    </>
  );
}
