import React from 'react';
import ItemsGrid from '../components/ItemsGrid';
import ItemsLink from '../components/ItemsLink';
import user from '../services/user';

export default function DriverHomePageComponent() {
  return (
    <>
      <h1>Your Points: {user.points}</h1>
      <ItemsGrid>
        {user.sponsor ? (
          <ItemsLink href="/catalog">Browse Catalog</ItemsLink>
        ) : (
          <ItemsLink href="/sponsorList">Apply to Sponsor</ItemsLink>
        )}
        <ItemsLink href="/profileData">Edit Driver Profile</ItemsLink>
        <ItemsLink href="/">View Reports</ItemsLink>
      </ItemsGrid>
    </>
  );
}
