import React, { useState } from 'react';

function DateRangeFilter({ onFilterChange }) {
  const [startDate, setStartDate] = useState('2021-06-01');
  const [endDate, setEndDate] = useState('2021-12-31');

  const handleFilterClick = () => {
    onFilterChange({ startDate, endDate });
  };

  return (
    <div className="date-range-container">
    
      <div className="date-range-item">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min="2021-06-01"
          max="2021-12-31"
          className="date-input"
        />
      </div>
      <div className="date-range-item">
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min="2021-06-01"
          max="2021-12-31"
          className="date-input"
        />
      </div>
      <button onClick={handleFilterClick}>Filter</button>
  </div>
  );
}



export default DateRangeFilter;
