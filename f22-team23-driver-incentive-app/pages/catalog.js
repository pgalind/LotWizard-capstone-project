import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import EbayItem from '../components/EbayItem';
import axios from 'axios';
import Cookie from 'js-cookie';
import CatalogGrid from '../components/CatalogGrid';
import { itemList } from '../data/itemList.js';

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
