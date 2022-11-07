import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import ItemsLink from '../components/ItemsLink';
import axios from 'axios';
import user from '../services/user';
import reportPointHistory from './reportPointHistory';

export default function generateSponsorReport(values){
    reportPointHistory()
}