import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { logNavigation } from '../lib/helpers';
import { useRouter } from 'next/router';
import user from '../services/user';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Button } from '@mui/material';

// Anything inside {} is a dynamic property.

export default function Layout({ title, children }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    axios
      .post('/api/getDriverAlerts', {
        userName: user.name,
      })
      .then((response) => {
        console.log(response.data[0]['COUNT(*)']);
        setNotificationCount(response.data);
        console.log('User: ' + user.totalPointChanges);
        if (user.totalPointChanges != response.data[0]['COUNT(*)']) {
          //notificationColor = 'red';
          setNotificationCount(response.data[0]['COUNT(*)']);
        } else {
          //notificationColor = 'blue';
          setNotificationCount(0);
        }
        setError('');
      })
      .catch((error) => {
        setError('Could not retrieve point history for user');
        console.log(error);
      });
  }, []);

  // ADDED BY KALEB
  const log_SignInClicked = (event) => {
    let data = { content: 'sign in attempted' };
    axios.post('/api/logSignIn', data).then((response) => {
      console.log(response);
    });
  };

  const signInButtonClicked = (event) => {
    log_SignInClicked(event);
    logNavigation(event);
    router.push('../login');
  };

  const UsersClicked = (event) => {
    let data = { content: 'test' };
    axios.post('/api/fetchUsers', data).then((response) => {
      console.log(response);
    });
  };

  const logOutOnClick = () => {
    user.name = null;
    user.role = null;
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  const AlertIconClicked = () => {
    axios
      .post('/api/clearAlerts', {
        userName: user.name,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - LotWizard' : 'LotWizard'}</title>
        <meta name="description" content="LotWizard website" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-14 bg-slate-50 justify-between shadow-md items-center px-8">
            <Link href="/">
              <a className="text-lg font-bold">LotWizard</a>
            </Link>

            <form className="flex items-center">
              <div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:outline-none block w-full pl-4 py-2"
                  placeholder="Search"
                  required=""
                ></input>
              </div>
              <button
                type="submit"
                className="p-1.5 ml-2 text-white bg-slate-200 rounded-lg hover:bg-blue-400 focus:outline-none"
              >
                <SearchIcon color="action" />
                <span className="sr-only">Search</span>
              </button>
            </form>

            <div>
              {!user.name ? (
                <>
                  <Link href="../register">
                    <a className="p-2 hover:text-blue-600">Register</a>
                  </Link>
                  <button
                    className="p-2 hover:text-blue-600"
                    onClick={signInButtonClicked}
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  {notificationCount == 0 ? (
                    <Link href="../pointHistory">
                      <button className="p-2 ml-2 rounded-lg focus:outline-none">
                        <NotificationsNoneIcon color="action" />
                      </button>
                    </Link>
                  ) : (
                    <Link href="../pointHistory" className="text-black">
                      <button
                        className="p-2 ml-2 rounded-lg focus:outline-none"
                        onClick={AlertIconClicked}
                      >
                        <NotificationsIcon color="primary" />
                        {notificationCount}
                      </button>
                    </Link>
                  )}
                  <Link href="../userProfile">
                    <a className="p-2 ml-2 hover:text-blue-600">{user.name}</a>
                  </Link>
                  <button
                    className="p-2 ml-2 hover:text-blue-600"
                    onClick={logOutOnClick}
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-8 px-8">{children}</main>

        <footer className="flex bg-slate-50 h-10 justify-center items-center shadow-inner">
          <div>
            <button className="p-2 hover:text-blue-600" onClick={UsersClicked}>
              Users
            </button>
          </div>
          <p>&copy; 2022 LotWizard | All Rights Reserved</p>
        </footer>
      </div>
    </>
  );
}
