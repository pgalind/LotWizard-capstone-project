import React, { useState, useEffect } from 'react';
import user from '../services/user';
import Layout from '../components/Layout';
import ItemsGrid from '../components/ItemsGrid';
import ItemsLink from '../components/ItemsLink';
import SponsorHomePageComponent from '../components/SponsorHomePageComponent';
import DriverHomePageComponent from '../components/DriverHomePageComponent';
import axios from 'axios';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [points, setPoints] = useState(0);
  const [role, setRole] = useState('');

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
        setLoading(false);
        setPoints();
        setError('Could not retrieve points for user');
        console.log(error);
      });
  }, [user.name]);

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
    }
  } else
    return (
      <Layout title="Home Page">
        <h1 className="text-lg">Need help choosing a Sponsor company?</h1>
        <h2>Learn more about them and view their catalogs!</h2>
        <ItemsGrid>
          <ItemsLink href="/catalog">Sponsor A</ItemsLink>
          <ItemsLink href="/catalog">Sponsor B</ItemsLink>
          <ItemsLink href="/catalog">Sponsor C</ItemsLink>
          <ItemsLink href="/catalog">Sponsor D</ItemsLink>
          <ItemsLink href="/catalog">Sponsor E</ItemsLink>
          <ItemsLink href="/catalog">Sponsor F</ItemsLink>
        </ItemsGrid>
      </Layout>
    );
}
