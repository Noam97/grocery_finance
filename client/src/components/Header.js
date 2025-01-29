import React, { useState } from 'react';
import DateRangeFilter from './DateRangeFilter';
import './style/Header.css';


function Header({ startDate, endDate, onFilterChange }) {
  const [showFilter, setShowFilter] = useState(false);

  // Toggle the visibility of the date range filter when button is clicked
  const handleChangeRangesClick = () => {
    setShowFilter(!showFilter); 
  };
  return (
    <header>
      <h1>Small Grocery Shop</h1>
      <h2>Financial Data</h2>
      <div className="date-info">
        <p>Showing financial data from {startDate} to {endDate}</p>
        {!showFilter && (
          <button className="btn" onClick={handleChangeRangesClick}>
            Change date range
          </button>
      )}

    </div>
      <DateRangeFilter
        onFilterChange={onFilterChange}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
    </header>
  );
}

export default Header;
