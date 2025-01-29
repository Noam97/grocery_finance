import React from 'react';

function Header({ startDate, endDate }) {
  return (
    <header>
      <h1>Financial Data</h1>
      <p>Showing data from {startDate} to {endDate}</p>
    </header>
  );
}

export default Header;
