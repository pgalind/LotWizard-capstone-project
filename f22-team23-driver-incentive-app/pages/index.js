import React, { useState, useEffect } from 'react';
import user from '../services/user';
import Layout from '../components/Layout';
import ItemsGrid from '../components/ItemsGrid';
import ItemsLink from '../components/ItemsLink';
import SponsorHomePageComponent from '../components/SponsorHomePageComponent';
import DriverHomePageComponent from '../components/DriverHomePageComponent';
import AdminHomePageComponent from '../components/AdminHomePageComponent';
import axios from 'axios';

export default function Home() {
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [points, setPoints] = useState(0);
  const [role, setRole] = useState('');
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    axios
      .post('/api/queryUserPoints', {
        userName: user.name,
      })
      .then((response) => {
        setLoading(false);
        setPoints(response.data[0]['Points']);
        setRole(response.data[0]['Role']);
        user.points = response.data[0]['Points'];
        user.role = response.data[0]['Role'];
      })
      .catch((err) => {
        setError('Could not retrieve points for user');
        console.log(error);
      });
  }, [user.name]);

  useEffect(() => {
    axios
      .post('/api/getSponsorList')
      .then((response) => {
        console.log('sponsors reponse: ' + response.data);
        setLoading(false);
        setSponsors(response.data);
        setError('');
      })
      .catch((err) => {
        setError('Could not retrieve Sponsor List');
        console.log(error);
      });
  }, []);

  if (loading) {
    return <div>Loading . . .</div>;
  }

  if (user.name) {
    console.log(user);
    if (user.role == 'Driver') {
      return (
        <Layout title="Home Page">
          <DriverHomePageComponent />
        </Layout>
      );
    } else if (user.role == 'Sponsor') {
      return (
        <Layout title="Home Page">
          <SponsorHomePageComponent />
        </Layout>
      );
    } else if (user.role == 'Admin') {
      return (
        <Layout title="Home Page">
          <AdminHomePageComponent />
        </Layout>
      );
    }
  } else
    return (
      <Layout title="Home Page">
        <h1 className="text-lg">Need help choosing a Sponsor company?</h1>
        <h2>Learn more about them and view their catalogs!</h2>
        <ItemsGrid>
          {sponsors.map((val, key) => {
            return (
              <ItemsLink key={key} href="/catalog">
                {val['SponsorCompany']}
              </ItemsLink>
            );
          })}
        </ItemsGrid>
      </Layout>
    );
}
