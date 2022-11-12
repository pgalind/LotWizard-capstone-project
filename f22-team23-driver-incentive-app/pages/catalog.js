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
  const [searchIDs, setSearchIDs] = useState([]);
  const [token, setToken] = useState('');
  const [view, setView] = useState('driver');
  const [searchInput, setSearchInput] = useState('');
  const [init, setInit] = useState(false);



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

  function searchCatalog(event) {
    const timer = setTimeout(() => {
      const keyword = event.target.value;
      const limit = 20;
      console.log(keyword);
      if (keyword.length >= 1) {
        axios({
          method: 'get',
          url:
            `https://api.ebay.com/buy/browse/v1/item_summary/search?q=` +
            keyword +
            `&limit=` +
            limit,
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
            'X-EBAY-C-ENDUSERCTX':
              'contextualLocation=country=<2_character_country_code>,zip=<zip_code>,affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId></referenceId>',
          },
        })
          .then((response) => {
            var IDs = [];
            var items = response.data.itemSummaries;
            for (var i = 0; i < items.length; i++) {
              //console.log(items);
              //console.log(response.data);
              //console.log(items[i].itemId.split('|')[1]);
              IDs[i] = items[i].itemId;
            }
            setSearchIDs(IDs);
            console.log(response);
            console.log('searchbar');
            console.log(IDs);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 2000);
    return () => clearTimeout(timer);
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
        }
        setItemIDs(IDs);
        console.log(IDs);
        setInit(true);
      });
  }, []);

  console.log('itemIDs');
  console.log(itemIDs);

  if ((token == '' || !itemIDs.length) && init == false) {
    return (
      <Layout title="Catalog">
        <h1 className="text-xl text-black drop-shadow-2xl">
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

          <button
            className="py-2 px-4 hover:text-white bg-gray-200 rounded-lg hover:bg-slate-400"
            onClick={() => setView('sponsor')}
          >
            Switch to Sponsor View
          </button>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
          {itemIDs.map((ID, index) =>
            index == 0 ? (
              <EbayItem
                token={token}
                itemID={ID}
                newToken={newToken}
                view={view}
                key={ID}
                refresh={true}
              />
            ) : (
              <EbayItem
                token={token}
                itemID={ID}
                newToken={newToken}
                view={view}
                key={ID}
              />
            )
          )}
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout title="Catalog">
        <div className="flex justify-between items-center pb-5">
          <a className="catalog-title">Sponsor Catalog</a>

          <form className="flex items-center">
            <div className="xl:w-96">
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-l-lg focus:outline-none block w-full pl-4 py-2"
                placeholder="Search for products"
                onChange={searchCatalog}
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
          {searchIDs.map((ID, index) => (
            <EbayItem
              token={token}
              itemID={ID}
              newToken={newToken}
              view={view}
              key={ID}
            />
          ))}
        </div>
      </Layout>
    );
  }
}

//<EbayItem token={token} itemID={itemIDs[3]} />
//<EbayItem token={token} itemID={itemIDs[4]} />
//<EbayItem token={token} itemID={itemIDs[5]} />
