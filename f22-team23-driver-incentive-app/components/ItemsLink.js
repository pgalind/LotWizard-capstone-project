import React from 'react';
import Link from 'next/link';

export default function ItemsLink({ dest, title }) {
  return (
    <Link href={'/' + dest}>
      <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">{title}</a>
    </Link>
  );
}
