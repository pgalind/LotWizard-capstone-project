import React from 'react';
import Link from 'next/link';
import ItemsGrid from '../components/ItemsGrid';
import Layout from '../components/Layout';
import { useSession, signIn, signOut } from 'next-auth/react';
import ItemsLink from '../components/ItemsLink';

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Layout title="Home Page">
        <ItemsGrid>
          <ItemsLink dest="catalog" title="Sponsor Catalog"></ItemsLink>
          <ItemsLink dest="" title="Sponsor Catalog"></ItemsLink>
          <ItemsLink dest="" title="Sponsor Catalog"></ItemsLink>
        </ItemsGrid>
      </Layout>
    );
  }

  return (
    <Layout title="Home Page">
      <h1 className="text-lg">Need help choosing a Sponsor company?</h1>
      <h2>Learn more about them and view their catalogs!</h2>
      <ItemsGrid>
        <ItemsLink dest="" title="Sponsor 1"></ItemsLink>
        <ItemsLink dest="" title="Sponsor 2"></ItemsLink>
        <ItemsLink dest="" title="Sponsor 3"></ItemsLink>
        <ItemsLink dest="" title="Sponsor 4"></ItemsLink>
        <ItemsLink dest="" title="Sponsor 5"></ItemsLink>
        <ItemsLink dest="" title="Sponsor 6"></ItemsLink>
      </ItemsGrid>
    </Layout>
  );
}
