import React from 'react';
import ItemsGrid from '../components/ItemsGrid';
import Layout from '../components/Layout';
import ItemsLink from '../components/ItemsLink';
import user from '../services/user'
import SponsorHomePageComponent from '../components/SponsorHomePageComponent';

export default function Home() {
  return user.name ? (
    <Layout title="Home Page">
      <ItemsGrid>
        <ItemsLink href="/catalog">Sponsor Catalog</ItemsLink>
        <ItemsLink href="/profileData">Profile Data</ItemsLink>
        <ItemsLink href=""></ItemsLink>
      </ItemsGrid>
    </Layout>
  ) : (
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
