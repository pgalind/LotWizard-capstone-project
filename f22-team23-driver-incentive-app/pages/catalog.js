import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import EbayItem from '../components/EbayItem';
import ItemsGrid from '../components/ItemsGrid';
import { itemList } from '../data/itemList.js';
import axios from 'axios';
import Cookie from 'js-cookie';

export default function Catalog() {
  // for every catalog item, create an EbayItem component passing the itemID
  //const { data: session } = useSession();
  const [itemIDs, setItemIDs] = useState([]);
  const [token, setToken] = useState('');
  const [view, setView] = useState('driver');

  console.log('page loaded');

  function newToken(forceReload) {
    axios.post('/api/token', {}).then((response) => {
      setToken('Bearer ' + response.data.access_token);
      Cookie.set('token', 'Bearer ' + response.data.access_token);
      console.log('Got new token:');
      console.log('Bearer ' + response.data.access_token);
    });
    if (forceReload == true) {
      window.location.reload(false);
    }
  }

  useEffect(() => {
    if (typeof Cookie.get('token') == 'undefined') {
      newToken(false);
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
      <Layout title="Catalog">
        <h1 className="text-lg text-white drop-shadow-2xl">
          Connecting to database . . .
        </h1>
        <h2>LOADING</h2>
      </Layout>
    );
  } else if (view == 'driver') {
    return (
      <Layout title="Catalog">
        <div className="flex justify-between items-center">
          <a className="catalog-title">Sponsor Catalog</a>
          <button
            className="p-2 hover:text-white bg-gray-200 rounded-2xl hover:bg-gray-400"
            onClick={() => setView('sponsor')}
          >
            Switch to Sponsor View
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4">
          <EbayItem
            token={token}
            itemID={itemIDs[0]}
            newToken={newToken}
            refresh={true}
          />
          <EbayItem token={token} itemID={itemIDs[1]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[2]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[3]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[4]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[5]} newToken={newToken} />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout title="Catalog">
        <div className="flex justify-between items-center">
          <a className="catalog-title">Add to Sponsor Catalog</a>
          <button
            className="p-2 hover:text-white bg-gray-200 rounded-2xl hover:bg-gray-400"
            onClick={() => setView('driver')}
          >
            Back to Driver View
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-8 lg:grid-cols-8">
          <EbayItem
            token={token}
            itemID={itemIDs[0]}
            newToken={newToken}
            refresh={true}
          />
          <EbayItem token={token} itemID={itemIDs[1]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[2]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[3]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[4]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[5]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[3]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[4]} newToken={newToken} />
          <EbayItem token={token} itemID={itemIDs[5]} newToken={newToken} />
        </div>
      </Layout>
    );
  }
}

//<EbayItem token={token} itemID={itemIDs[3]} />
//<EbayItem token={token} itemID={itemIDs[4]} />
//<EbayItem token={token} itemID={itemIDs[5]} />
