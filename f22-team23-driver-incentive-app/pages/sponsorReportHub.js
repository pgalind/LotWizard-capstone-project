import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import ItemsLink from '../components/ItemsLink';
import axios from 'axios';

export default function sponsorReportHub(){


    return(
        <Layout title="Sponsor Reports">
            <h1>Reports List</h1>
            <ItemsLink href="driverReportMenu">Driver Point Tracking</ItemsLink>
        </Layout>
        
    )
}