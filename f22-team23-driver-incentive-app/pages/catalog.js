import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import EbayItem from '../components/EbayItem';
import axios from 'axios';
import Cookie from 'js-cookie';
import SearchIcon from '@mui/icons-material/Search';

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
        <div className="flex justify-between items-center pb-4">
          <a className="catalog-title">Sponsor Catalog</a>

          <form className="flex items-center">
            <div className="xl:w-96">
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-l-lg focus:outline-none block w-full pl-4 py-2"
                placeholder="Search"
                required=""
              ></input>
            </div>
            <button
              type="submit"
              className="p-2 text-white bg-slate-200 rounded-r-lg hover:bg-blue-400 focus:outline-none"
            >
              <SearchIcon color="action" />
              <span className="sr-only">Search</span>
            </button>
          </form>

          <button
            className="py-2 px-4 hover:text-white bg-gray-200 rounded-lg hover:bg-slate-400"
            onClick={() => setView('sponsor')}
          >
            Switch to Sponsor View
          </button>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
          <EbayItem
            token={token}
            itemID={itemIDs[0]}
            newToken={newToken}
            refresh={true}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[1]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[2]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[3]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[4]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[5]}
            newToken={newToken}
            view={view}
          />
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout title="Catalog">
        <div className="flex justify-between items-center pb-5">
          <a className="catalog-title">Add to Sponsor Catalog</a>

          <form className="flex items-center">
            <div className="xl:w-96">
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-l-lg focus:outline-none block w-full pl-4 py-2"
                placeholder="Search"
                required=""
              ></input>
            </div>
            <button
              type="submit"
              className="p-2 text-white bg-slate-200 rounded-r-lg hover:bg-blue-400 focus:outline-none"
            >
              <SearchIcon color="action" />
              <span className="sr-only">Search</span>
            </button>
          </form>

          <button
            className="py-2 px-4 hover:text-white bg-gray-200 rounded-lg hover:bg-slate-400"
            onClick={() => setView('driver')}
          >
            Back to Driver View
          </button>
        </div>
        <div className="grid gap-4 grid-cols-1  md:grid-cols-6 lg:grid-cols-6">
          <EbayItem
            token={token}
            itemID={itemIDs[0]}
            newToken={newToken}
            refresh={true}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[1]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[2]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[3]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[4]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[5]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[3]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[4]}
            newToken={newToken}
            view={view}
          />
          <EbayItem
            token={token}
            itemID={itemIDs[5]}
            newToken={newToken}
            view={view}
          />
        </div>
      </Layout>
    );
  }
}

//<EbayItem token={token} itemID={itemIDs[3]} />
//<EbayItem token={token} itemID={itemIDs[4]} />
//<EbayItem token={token} itemID={itemIDs[5]} />
