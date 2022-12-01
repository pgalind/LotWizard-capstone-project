import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Catalog from '../components/Catalog';

const Testing = ({ match, location }) => {
  console.log('HERE');
  return (
    <>
      <p>
        <strong>Match Props: </strong>
        <code>{JSON.stringify(match, null, 2)}</code>
      </p>
      <p>
        <strong>Location Props: </strong>
        <code>{JSON.stringify(location, null, 2)}</code>
      </p>
    </>
  );
};

export default function SponsorCatalogLink(prop) {
  const [path, setPath] = useState('/catalog/:' + prop.ID);
  console.log('key is ' + prop.ID);
  console.log('name is ' + prop.name);
  return (
    <section className="App">
      <Router>
        <Link to="/16">
          <a className="bg-slate-100 p-6 rounded-lg hover:bg-slate-200">
            {prop.name}
          </a>
        </Link>
        <Routes>
          <Route exact path="/16" element={<Catalog />} />
        </Routes>
      </Router>
      <a href="/about">with reload</a>
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
