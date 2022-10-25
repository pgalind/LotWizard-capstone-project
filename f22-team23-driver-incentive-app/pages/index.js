import React from 'react';
import ItemsGrid from '../components/ItemsGrid';
import Layout from '../components/Layout';
import ItemsLink from '../components/ItemsLink';
import user from '../services/user'
import SponsorHomePageComponent from '../components/SponsorHomePageComponent';

export default function Home() {

  if(user.role === 'Sponsor'){
    return(
      <Layout title = 'Sponsor Home Page'>
        <SponsorHomePageComponent></SponsorHomePageComponent>
      </Layout>
    );
  }


  return (
    <Layout title="Home Page">
      <h1 className="text-lg">Need help choosing a Sponsor company?</h1>
      <h2>Learn more about them and view their catalogs!</h2>
      <ItemsGrid>
        <ItemsLink href="/catalog">Sponsor A</ItemsLink>
        <ItemsLink href="">Sponsor B</ItemsLink>
        <ItemsLink href="">Sponsor C</ItemsLink>
        <ItemsLink href="">Sponsor D</ItemsLink>
        <ItemsLink href="">Sponsor E</ItemsLink>
        <ItemsLink href="">Sponsor F</ItemsLink>
      </ItemsGrid>
    </Layout>
  );
}
