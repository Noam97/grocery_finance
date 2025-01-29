import React, { useState } from 'react';
import DateRangeFilter from './componenets/DateRangeFilter';
import FinancialChart from './componenets/FinancialChart';
import Header from './componenets/Header';
import './App.css';

function App() {
  // טווח תאריכים ברירת המחדל
  const [startDate, setStartDate] = useState('2021-06-01');
  const [endDate, setEndDate] = useState('2021-12-31');

  // פונקציה שתעדכן את טווח התאריכים כאשר כפתור הסינון נלחץ
  const handleFilterChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  // פונקציה להמיר תאריך לפורמט DD.MM.YYYY
  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options); // en-GB כדי לקבל את הפורמט DD/MM/YYYY
  };

  return (
    <div className="App">
      <Header startDate={formatDate(startDate)} endDate={formatDate(endDate)} />
      <DateRangeFilter onFilterChange={handleFilterChange} />
      <FinancialChart startDate={startDate} endDate={endDate} />
    </div>
  );
}

export default App;
