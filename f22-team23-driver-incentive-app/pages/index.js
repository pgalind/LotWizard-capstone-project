import React from 'react';
import Link from 'next/link';
import ItemsGrid from '../components/ItemsGrid';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Home Page">
      <ItemsGrid>
        <Link href="/catalog">
          <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">
            Browse Catalog
          </a>
        </Link>
        <Link href="/">
          <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">
            Option 2
          </a>
        </Link>
        <Link href="/">
          <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">
            Option 3
          </a>
        </Link>
      </ItemsGrid>
    </Layout>
  );
}
