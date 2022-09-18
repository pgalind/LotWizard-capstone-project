import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

// Anything inside {} is a dynamic property.

export default function Layout({ title, children }) {
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
              <Link href="/cart">
                <a className="p-2">Account</a>
              </Link>
              <Link href="/login">
                <a className="p-2">Log in</a>
              </Link>
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-8 px-8">{children}</main>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>&copy; 2022 LotWizard | All Rights Reserved</p>
        </footer>
      </div>
    </>
  );
}
