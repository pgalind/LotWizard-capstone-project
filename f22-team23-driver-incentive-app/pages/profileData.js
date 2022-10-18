import user from '../services/user'
import Layout from '../components/Layout';
import ProfileDataComponent from '../components/ProfileDataComponent';
import React, { useState, useEffect } from 'react';

export default function profileData(){
    return (
        <Layout title="Profile Data Page">
            <ProfileDataComponent></ProfileDataComponent>
        </Layout>
    );
}