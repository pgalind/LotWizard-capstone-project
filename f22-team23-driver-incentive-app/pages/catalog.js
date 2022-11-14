import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import EbayItem from '../components/EbayItem';
import axios from 'axios';
import Cookie from 'js-cookie';
import SearchIcon from '@mui/icons-material/Search';

export default function Catalog() {
  //const { data: session } = useSession();
  const [itemIDs, setItemIDs] = useState([]);
  const [searchIDs, setSearchIDs] = useState([]);
  const [token, setToken] = useState('');
  const [view, setView] = useState('driver');
  const [isSearching, setIsSearching] = useState(false);
  const [init, setInit] = useState(false);

  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');

  const [sponsorID, setSponsorID] = useState(1);

  // ACTION: OLD TOKEN IS INVALID
  function newToken(forceReload) {
    axios.post('/api/getToken', {}).then((response) => {
      setToken('Bearer ' + response.data.access_token);
      Cookie.set('token', 'Bearer ' + response.data.access_token);
      console.log('Grabbed new token for Auth:');
      console.log('Bearer ' + response.data.access_token);
      if (forceReload == true) {
        console.log('Force reload attempted to resolve outdated cookie');
        window.location.reload();
      }
    });
  }

  function testing() {
    Cookie.set('token', 'Bearer this doesnt work');
    console.log('cookie sabotaged');
  }

  // ACTION: CHILD COMPONENT EBAY ITEM 'ADD TO CATALOG' OR 'REMOVE FROM CATALOG' BUTTON CLICKED
  function editCatalog(event, itemID) {
    if (event == 'add') {
      axios
        .post('/api/addSponsorItems', {
          sponsorID: sponsorID,
          itemID: itemID,
        })
        .then((response) => {
          console.log(
            'Successfully added ' +
              itemID +
              ' to catalog under Sponsor ' +
              sponsorID
          );
          getSponsorItems();
        });
    } else if (event == 'remove') {
      axios
        .post('/api/removeSponsorItems', {
          sponsorID: sponsorID,
          itemID: itemID,
        })
        .then((response) => {
          console.log(
            'Successfully removed ' +
              itemID +
              ' from catalog under Sponsor ' +
              sponsorID
          );
          getSponsorItems();
        });
    }
  }

  // ACTION: LIMIT SEARCH RESULTS SLIDER MOVED
  function changeLimit(event) {
    setLimit(event.target.value);

    // Object being passed into searchCatalog call is a fake
    // event used to imitate react's own event handling for onClick,
    // Instead of getting a new keyword for value, we just pass
    // the value we already had stored in keyword
    const object = { target: { value: keyword } };
    searchCatalog(object);
  }

  // ACTION: SEARCH ICON NEXT TO SEARCH BOX CLICKED
  function clickSearchIcon(event) {
    event.preventDefault();
    const object = { target: { value: keyword } };
    searchCatalog(object);
  }

  // ACTION: TEXT ENTERED INTO SEARCH BOX
  function searchCatalog(event) {
    setKeyword(event.target.value);
    setIsSearching(true);
    const timer = setTimeout(() => {
      const input = event.target.value;
      if (input.length >= 1) {
        axios({
          method: 'get',
          url:
            `https://api.ebay.com/buy/browse/v1/item_summary/search?q=` +
            input +
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
            //console.log(response);
            for (var i = 0; i < items.length; i++) {
              IDs[i] = items[i].itemId;
            }
            setSearchIDs(IDs);
            //console.log(response);
            //console.log('searchbar');
            //console.log(IDs);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }

  // ACTION: ITEMIDS LIST IS OUT OF DATE
  async function getSponsorItems() {
    axios
      .post('/api/querySponsorItems', {
        sponsorID: sponsorID,
      })
      .then((response) => {
        var IDs = [];
        for (var i = 0; i < response.data.length; i++) {
          IDs[i] = response.data[i]['ItemID'];
          //console.log(response.data[i]);
        }
        setItemIDs(IDs);
        setInit(true);
        console.log('ItemIDs pulled for Sponsor from Database: ');
        console.log(IDs);
        return IDs;
      });
  }

  // ACTION: PAGE REFRESHED
  useEffect(() => {
    if (typeof Cookie.get('token') == 'undefined') {
      newToken(false);
    } else {
      console.log('Used old token for Auth');
      setToken(Cookie.get('token'));
    }
    getSponsorItems();
  }, []);

  // for each catalog item, create an EbayItem component passing in the itemID
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
          <a className="catalog-title">Sponsor's Catalog</a>

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
          {isSearching ? (
            <button
              className="py-2 px-4 hover:text-white bg-gray-200 rounded-lg hover:bg-slate-400"
              onClick={() => setIsSearching(false)}
            >
              Show items currently in Sponsor's Catalog
            </button>
          ) : (
            <a className="catalog-title">Sponsor's Catalog</a>
          )}

          <form className="flex items-center">
            <div className="xl:w-96">
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-l-lg focus:outline-none block w-full pl-4 py-2"
                placeholder="Search for products"
                value={keyword}
                onChange={searchCatalog}
                required=""
              ></input>
            </div>
            <button
              type="submit"
              className="p-2 text-white bg-slate-200 rounded-r-lg hover:bg-blue-400 focus:outline-none"
              onClick={clickSearchIcon}
            >
              <SearchIcon color="action" />
              <span className="sr-only">Search</span>
            </button>
          </form>

          <span>
            <input
              id="minmax-range"
              type="range"
              min="0"
              max="40"
              value={limit}
              class="w-72 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              onChange={changeLimit}
            ></input>
            <div className="text-xs">
              Dislaying {limit} results at a time (scroll to change)
              <b>
                {searchIDs.length <= limit && isSearching ? (
                  <b className="font-normal underline decoration-pink-500">
                    {' '}
                    *Only {searchIDs.length} items found
                  </b>
                ) : (
                  <b></b>
                )}
              </b>
            </div>
          </span>

          <button
            className="py-2 px-4 hover:text-white bg-gray-200 rounded-lg hover:bg-slate-400"
            onClick={() => setView('driver')}
          >
            Back to Driver View
          </button>
        </div>
        {!isSearching ? (
          <div className="grid gap-4 grid-cols-1  md:grid-cols-6 lg:grid-cols-6">
            {itemIDs.map((ID, index) => (
              <EbayItem
                token={token}
                itemID={ID}
                newToken={newToken}
                view={view}
                key={ID}
                inCatalog={true}
                editCatalog={editCatalog}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1  md:grid-cols-6 lg:grid-cols-6">
            {searchIDs.map((ID, index) =>
              itemIDs.includes(ID) ? (
                <EbayItem
                  token={token}
                  itemID={ID}
                  newToken={newToken}
                  view={view}
                  key={ID}
                  inCatalog={true}
                  editCatalog={editCatalog}
                />
              ) : (
                <EbayItem
                  token={token}
                  itemID={ID}
                  newToken={newToken}
                  view={view}
                  key={ID}
                  inCatalog={false}
                  editCatalog={editCatalog}
                />
              )
            )}
          </div>
        )}
      </Layout>
    );
  }
}
