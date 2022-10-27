import React from 'react';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ExitButton = () => {
  return (
    <Link href={'../'}>
      <button className="p-2 mb-4 rounded-lg hover:bg-slate-200 focus:outline-none">
        <ArrowBackIcon color="action" />
      </button>
    </Link>
  );
};

export default ExitButton;
