import React, { useState, useEffect } from 'react';
import ItemsGrid from '../components/ItemsGrid';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import ItemsLink from '../components/ItemsLink';
import EbayItem from '../components/EbayItem';
import axios from 'axios';
import Cookie from 'js-cookie';

export default function Catalog() {
  //const { data: session } = useSession();
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
  }, []);

  if (token == '') {
    return (
      <Layout title="Home Page">
        <h1 className="text-lg">Sponsor A's Catalog</h1>
        <h2>includes the following...</h2>
        <h3></h3>
      </Layout>
    );
  } else {
    return (
      <Layout title="Home Page">
        <h1 className="text-lg">Sponsor A's Catalog</h1>
        <h2>includes the following...</h2>
        <h3></h3>
        <EbayItem token={token} index={0} />
      </Layout>
    );
  }
}
