import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import user from '../services/user';
import ExitButton from '../components/ExitButton';
//import getPoints from '../hooks/getUserPoints';

export default function notificationPortal() {
    console.log("HERE");
  return (
    <div className="p-10">
      <ExitButton />

      <h1 className="font-bold text-xl mb-6">{user.name}'s Notification Portal</h1>

      <Link href="/pointHistory"><a className="p-2 hover:text-blue-600">Points</a></Link>
      <p></p>
      <Link href="/driverApplicationHistory"><a className="p-2 hover:text-blue-600">Applications</a></Link>
    </div>
  );
}
