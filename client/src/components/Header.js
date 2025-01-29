import React from 'react';

function Header({ startDate, endDate }) {
  return (
    <header>
      <h1>Small Grocery Shop</h1>
      <h2>Financial Data</h2>
      <p>Showing financial data from {startDate} to {endDate}</p>
    </header>
  );
}

export default Header;
