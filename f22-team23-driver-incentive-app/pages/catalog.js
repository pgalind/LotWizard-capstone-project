import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import EbayItem from '../components/EbayItem';
import CatalogGrid from '../components/CatalogGrid';
import { itemList } from '../data/itemList.js';

export default function Catalog() {
  // for every catalog item, create an EbayItem component passing the itemID
  return (
    <Layout title="Catalog">
      <h1 className="text-lg">Sponsor Catalog</h1>
      <CatalogGrid>
        <EbayItem></EbayItem>
      </CatalogGrid>
    </Layout>
  );
}
