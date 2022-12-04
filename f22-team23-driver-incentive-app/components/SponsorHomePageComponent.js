import React from 'react';
import user from '../services/user';
import ItemsGrid from '../components/ItemsGrid';
import ItemsLink from '../components/ItemsLink';

export default function SponsorHomePageComponent() {
  return (
    <>
      <h1 className="font-bold text-xl mb-6">Sponsor: {user.name}</h1>
      <ItemsGrid>
        <ItemsLink href="/catalog">Edit Catalog</ItemsLink>
        <ItemsLink href="/profileData">Edit Sponsor Info</ItemsLink>
        <ItemsLink href="/viewApplications">View Applications</ItemsLink>
        <ItemsLink href="/sponsorReportHub">View Reports</ItemsLink>
        <ItemsLink href="/sponsorUpdateDriverPoints">Update Driver Points</ItemsLink>
      </ItemsGrid>
    </>
  );
}
