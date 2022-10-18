import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import axios from 'axios'
import { useSession, signIn, signOut } from 'next-auth/react';
import {logNavigation} from '../lib/helpers';
import { useRouter } from 'next/router';
import user from '../services/user';

// Anything inside {} is a dynamic property.

export default function Layout({ title, children }) {
  const router = useRouter();

  // ADDED BY KALEB
  const log_SignInClicked = event =>{
    let data={content : 'sign in attempted'}
      axios.post('/api/axios/logsignin', data)
      .then((response) => {
        console.log(response)
      })
  }


  const signInButtonClicked = event => {
    log_SignInClicked(event)
    logNavigation(event)
    router.push('../login')
  };

  const UsersClicked = event => {
    let data={content: 'test'}
      axios.post('/api/axios/fetchusers', data)
      .then((response) => {
        console.log(response)
      })
  }

  const logOutOnClick = () =>{
    user.name = null
    router.push('/login')
  }

  /*if (loading) {
    return null;
  }*/
if(!user.name){
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

            <div>
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



    return(
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

            <div>
              <Link href="../userProfile">
                <a className="p-2 hover:text-blue-600">{user.name}</a>
              </Link>
              <button onClick = {logOutOnClick}>Log Out</button>
            </div>
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
