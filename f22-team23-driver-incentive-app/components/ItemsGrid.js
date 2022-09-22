import React from 'react';

export default function ItemsGrid({ children }) {
  return (
    <div className="grid grid-cols-3 gap-8 my-8 place-content-center text-center text-lg">
      {children}
    </div>
  );
}
