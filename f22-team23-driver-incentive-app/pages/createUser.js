import user from '../services/user';
import Layout from '../components/Layout';
import CreateUserComponent from '../components/CreateUserComponent';
import React, { useState, useEffect } from 'react';

export default function createUser() {
  return <CreateUserComponent />;
}
