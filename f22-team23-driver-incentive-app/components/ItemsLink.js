import React from 'react';
import Link from 'next/link';

export default function ItemsLink({ href, children }) {
  return (
    <Link href={href}>
      <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">
        {children}
      </a>
    </Link>
  );
}
