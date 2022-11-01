import React from 'react';
import user from '../services/user';
import ItemsGrid from '../components/ItemsGrid';
import ItemsLink from '../components/ItemsLink';

export default function AdminHomePageComponent() {
  return (
    <>
      <h1 className="font-bold text-xl mb-6">Admin: {user.name}</h1>
      <ItemsGrid>
        <ItemsLink href="/createUser">New User</ItemsLink>
        <ItemsLink href="/">New Sponsor Company</ItemsLink>
        <ItemsLink href="/">Edit a User's Profile</ItemsLink>
      </ItemsGrid>
    </>
  );
}
