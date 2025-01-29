import React, { useState } from 'react';

function DateRangeFilter({ onFilterChange }) {
  // תאריך ברירת המחדל - 1.6.21 ועד 31.12.21
  const [startDate, setStartDate] = useState('2021-06-01');
  const [endDate, setEndDate] = useState('2021-12-31');

  // פונקציה שתעדכן את טווח התאריכים כאשר כפתור הסינון נלחץ
  const handleFilterClick = () => {
    onFilterChange({ startDate, endDate });
  };

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min="2021-06-01" // הגבלת תאריך מינימלי
          max="2021-12-31" // הגבלת תאריך מקסימלי
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min="2021-06-01" // הגבלת תאריך מינימלי
          max="2021-12-31" // הגבלת תאריך מקסימלי
        />
        <button onClick={handleFilterClick}>Filter</button>
      </div>
    </div>
  );
}

export default DateRangeFilter;
