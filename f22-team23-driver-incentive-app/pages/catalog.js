import React, { useState, useEffect } from 'react';
import ItemsGrid from '../components/ItemsGrid';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import ItemsLink from '../components/ItemsLink';
import EbayItem from '../components/EbayItem';

export default function Catalog() {
  //const { data: session } = useSession();
  return (
    <Layout title="Home Page">
      <h1 className="text-lg">Sponsor A's Catalog</h1>
      <h2>includes the following...</h2>
      <h3></h3>
      <EbayItem></EbayItem>
    </Layout>
  );
}
