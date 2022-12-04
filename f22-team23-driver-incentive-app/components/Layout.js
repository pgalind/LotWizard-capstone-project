import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { logNavigation } from '../lib/helpers';
import { useRouter } from 'next/router';
import user from '../services/user';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';

// Anything inside {} is a dynamic property.

export default function Layout({ title, children, useNavigate }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // ADDED BY EDWARD
  if (typeof useNavigate == 'undefined') {
    useNavigate = function () {};
  }
  const navigate = useNavigate();

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

    // check cart
    setCartCount(user.cart.item.length);
  }, []);

  const navigatetoHomePage = () => {
    navigate('/');
  };

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

  const logOutOnClick = () => {
    user.name = null;
    user.role = null;
    user.points = 0;
    user.totalPointChanges = 0;
    user.applyingTo = null;
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

      <div className="flex h-screen flex-col">
        <header>
          <nav className="flex h-14 bg-slate-50 justify-between shadow-xl items-center px-8">
            {title == 'Catalog' ? (
              <a
                className="text-lg font-bold cursor-pointer"
                onClick={navigatetoHomePage}
              >
                LotWizard
              </a>
            ) : (
              <Link href="../">
                <a className="text-lg font-bold">LotWizard</a>
              </Link>
            )}
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
                    <Link href="../notificationPortal">
                      <button className="p-2 ml-2 rounded-lg focus:outline-none">
                        <NotificationsNoneIcon color="action" />
                      </button>
                    </Link>
                  ) : (
                    <Link href="../notificationPortal" className="text-black">
                      <button
                        className="p-2 ml-2 rounded-lg focus:outline-none"
                        onClick={AlertIconClicked}
                      >
                        <NotificationsIcon color="primary" />
                        {notificationCount}
                      </button>
                    </Link>
                  )}
                  {
                    //Cart business!
                    cartCount == 0 ? (
                      <Link href="../shoppingCart">
                        <button className="p-2 ml-2 rounded-lg focus:outline-none">
                          <ShoppingCartIcon color="action" />
                        </button>
                      </Link>
                    ) : (
                      <Link href="../shoppingCart">
                        <button className="p-2 ml-2 rounded-lg focus:outline-none">
                          <ShoppingCartIcon color="primary" />
                          {cartCount}
                        </button>
                      </Link>
                    )
                  }
                  <Link href="../userPreferences">
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

        <main className="container m-auto px-10 py-5">{children}</main>

        <footer className="flex bg-slate-50 p-4 h-10 justify-center items-center shadow-inner">
          <p>&copy; 2022 LotWizard | All Rights Reserved</p>
        </footer>
      </div>
    </>
  );
}
