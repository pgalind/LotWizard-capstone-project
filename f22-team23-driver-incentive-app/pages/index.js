import React, { useState, useEffect } from 'react';
import user from '../services/user';
import Layout from '../components/Layout';
import ItemsGrid from '../components/ItemsGrid';
import SponsorHomePageComponent from '../components/SponsorHomePageComponent';
import DriverHomePageComponent from '../components/DriverHomePageComponent';
import AdminHomePageComponent from '../components/AdminHomePageComponent';
import axios from 'axios';

import {
  Link as LinkR,
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Catalog from '../components/Catalog';
import Landing from '../components/Landing';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [points, setPoints] = useState(0);
  const [role, setRole] = useState('');
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    if (user.name !== '') {
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
          setError('');
          console.log('check: no error retrieving user points');
        })
        .catch((err) => {
          setError('Could not retrieve points for user');
          console.log(error);
        });
    }
  }, [user.name]);

  useEffect(() => {
    axios
      .post('/api/getSponsorList')
      .then((response) => {
        setLoading(false);
        setSponsors(response.data);
        setError('');
        console.log('check: no error retrieving sponsor list');
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
  }
  // ROUTER ADDED BY EDWARD
  else
    return (
      <Router>
        <Layout title="Catalog" useNavigate={useNavigate}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Landing>
                  <h1 className="text-lg">
                    Need help choosing a Sponsor company?
                  </h1>
                  <h2>Learn more about them and view their catalogs!</h2>
                  <ItemsGrid>
                    {sponsors.map((val, key) => {
                      return (
                        <LinkR to={`/${val['id']}`}>
                          <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">
                            {val['SponsorCompany']}
                          </a>
                        </LinkR>
                      );
                    })}
                  </ItemsGrid>
                </Landing>
              }
            />
            {sponsors.map((val, key) => {
              return (
                <Route
                  exact
                  path={`/${val['id']}`}
                  element={<Catalog ID={val['id']} useNavigate={useNavigate} />}
                />
              );
            })}
          </Routes>
        </Layout>
      </Router>
    );
}
