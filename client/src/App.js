import React, { useState } from 'react';
import DateRangeFilter from './components/DateRangeFilter';
import FinancialChart from './components/FinancialChart';
import Header from './components/Header';
import './App.css';

function App() {
  const [startDate, setStartDate] = useState('2021-06-01');
  const [endDate, setEndDate] = useState('2021-12-31');

  const handleFilterChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options); 
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
