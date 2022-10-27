import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import EbayItem from '../components/EbayItem';
import CatalogGrid from '../components/CatalogGrid';
import { itemList } from '../data/itemList.js';
import axios from 'axios';
import Cookie from 'js-cookie';

// ADDED BY KALEB
// TESTING
/*
const [items, setItems] = useState('');
useEffect(() => {
  axios.post('/api/querySponsorItems', {}).then((response) => {
    setItems(response.data[0]['ItemId']);
  });
}, []);
console.log('ITEM ID: ' + items);*/
// END TESTING
//374289166032, 294670499440, 325371985137,

export default function Catalog() {
  // for every catalog item, create an EbayItem component passing the itemID
  //const { data: session } = useSession();
  //const [itemIDs, setItemIDs] = useState([
  //  374289166032, 294670499440, 325371985137,
  //]);
  const [itemIDs, setItemIDs] = useState([]);
  const [token, setToken] = useState('');
  useEffect(() => {
    if (typeof Cookie.get('token') == 'undefined') {
      axios.post('/api/token', {}).then((response) => {
        setToken('Bearer ' + response.data.access_token);
        Cookie.set('token', 'Bearer ' + response.data.access_token);
        console.log('Got new token:');
        console.log('Bearer ' + response.data.access_token);
      });
    } else {
      console.log('used old token');
      setToken(Cookie.get('token'));
    }
    axios
      .post('/api/querySponsorItems', {
        sponsorID: 1,
      })
      .then((response) => {
        var IDs = [];
        for (var i = 0; i < response.data.length; i++) {
          IDs[i] = response.data[i]['ItemID'];
          console.log(response.data[i]);
          console.log('reference');
        }
        setItemIDs(IDs);
        console.log('ours');
        console.log(IDs);
      });
  }, []);

  if (token == '' || !itemIDs.length) {
    return (
      <Layout title="Home Page">
        <h1 className="text-lg">Sponsor A's Catalog</h1>
        <h2>includes the following...</h2>
        <h3></h3>
      </Layout>
    );
  } else {
    return (
      <Layout title="Catalog">
        <h1 className="text-lg">Sponsor Catalog</h1>
        <CatalogGrid>
          <EbayItem token={token} itemID={itemIDs[0]} />
          <EbayItem token={token} itemID={itemIDs[1]} />
          <EbayItem token={token} itemID={itemIDs[2]} />
        </CatalogGrid>
      </Layout>
    );
  }
}
