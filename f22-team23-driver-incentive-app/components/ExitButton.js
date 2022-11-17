import React from 'react';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

const ExitButton = () => {
  const router = useRouter();
  return (
    <button
      className="p-2 mb-4 rounded-lg hover:bg-slate-200 focus:outline-none"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowBackIcon color="action" />
    </button>
  );
};

export default ExitButton;
