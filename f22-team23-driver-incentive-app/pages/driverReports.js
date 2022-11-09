import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function driverReports(){
    const router = useRouter();

    const pointsLostOnClick = () => {

    }


    return(
        <Layout title="Driver Reports">
            <h1>Reports List</h1>
            <button onClick={pointsLostOnClick}>Points Lost Report</button>
        </Layout>
        
    )
}