import React from 'react';
import Link from 'next/link';
import ItemsGrid from '../components/ItemsGrid';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Home Page">
      <div>
        <p>PTS Balance: 100</p>
        <p>Sponsor Company: Amazon</p>
      </div>
      <ItemsGrid>
        <Link href="/catalog">
          <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">
            Browse Catalog
          </a>
        </Link>
        <Link href="/profile">
          <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">
            User Profile
          </a>
        </Link>
        <Link href="/reports">
          <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">
            View Reports
          </a>
        </Link>
      </ItemsGrid>
    </Layout>
  );
}
