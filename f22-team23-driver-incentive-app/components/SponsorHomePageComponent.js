import React from 'react';
import ItemsGrid from '../components/ItemsGrid';
import ItemsLink from '../components/ItemsLink';
import user from '../services/user';

export default function SponsorHomePageComponent() {
  return (
    <>
      <h1>Sponsor: {user.name}</h1>
      <ItemsGrid>
        <ItemsLink href="/catalog">Edit Catalog</ItemsLink>
        <ItemsLink href="/profileData">Edit Sponsor Info</ItemsLink>
        <ItemsLink href="/viewApplications">View Applications</ItemsLink>
      </ItemsGrid>
    </>
  );
}
