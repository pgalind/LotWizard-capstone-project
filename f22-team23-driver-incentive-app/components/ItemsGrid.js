import React from 'react';

export default function ItemCard({ children }) {
  return (
    <div className="grid grid-cols-3 gap-8 my-8 place-content-center text-center text-lg">
      {children}
    </div>
  );
}
