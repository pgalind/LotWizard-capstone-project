import React, { useState, useEffect } from 'react';
import user from '../services/user';
import ItemsGrid from '../components/ItemsGrid';
import ItemsLink from '../components/ItemsLink';
import axios from 'axios';

export default function DriverHomePageComponent() {
  const [activeSponsors, setActiveSponsors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let data = {username : user.name}
    axios
      .post('../api/getDriverActiveSponsorList', data)
      .then((response) => {
        setLoading(false);
        setActiveSponsors(response.data);
        setError('');
      })
      .catch((err) => {
        setError('Could not retrieve Active Sponsor List');
        console.log(error);
      });
  }, []);

  if (loading) {
    return <div>Loading . . .</div>;
  }
  
  return (
    <>
      <h1 className="font-bold text-xl mb-6">Your Points: {user.points}</h1>
      <ItemsGrid>
        {user.sponsor ? (
          <ItemsLink href="/catalog">Browse Catalog</ItemsLink>
        ) : (
          <ItemsLink href="/sponsorList">Apply to Sponsor</ItemsLink>
        )}
        <ItemsLink href="/profileData">Edit Driver Profile</ItemsLink>
        <ItemsLink href="/">View Reports</ItemsLink>
        {activeSponsors.map((val, key) => {
            console.log(val['SponsorCompany']);
            return (
              <ItemsLink key={key} href="/catalog">
                {val['SponsorCompany']}
              </ItemsLink>
            );
          })}
      </ItemsGrid>
    </>
  );
}
