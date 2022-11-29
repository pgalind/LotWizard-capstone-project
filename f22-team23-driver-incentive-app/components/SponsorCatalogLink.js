import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Router, Routes, Route } from 'react-router-dom';
import Catalog from '../components/Catalog';
import Link from 'next/link';

export default function SponsorCatalogLink(prop) {
  const [path, setPath] = useState('/catalog/:' + prop.ID);
  console.log('key is ' + prop.ID);
  console.log('name is ' + prop.name);
  return (
    <section className="App">
      <Router>
        <Link to="/">Home</Link>
        <Link to="/catalog">About</Link>
        <Link to="/users">Users</Link>
        <Route exact path="/" component={Catalog} />
        <Route exact path="/users" component={Catalog} />
        <Route exact path="/user/:userId" component={Catalog} />
        <Route exact path="/about" component={Catalog} />
      </Router>
      <a href="/about">about with browser reload</a>
    </section>
    /*<Link href={href}>
      <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">
        {children}
      </a>

      <Router>

      <Route exact path="/catalog/69" component={Catalog} />
    </Router>
    </Link>*/
  );
}
