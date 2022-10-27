import React from 'react';
import user from '../services/user';
import ItemsGrid from '../components/ItemsGrid';
import ItemsLink from '../components/ItemsLink';

export default function DriverHomePageComponent() {
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
      </ItemsGrid>
    </>
  );
}
