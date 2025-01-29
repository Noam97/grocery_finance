import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

function FinancialChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([
    ['Date', 'Income', 'Outcome', 'Clear']
  ]);

  useEffect(() => {
    if (startDate && endDate) {
      axios.get('http://localhost:5000/api/data', {
        params: { start: startDate, end: endDate }
      })
        .then(response => {
          console.log('Received data from API:', response.data);
          const data = response.data;
  
          const newData = data.map(item => {
            const date = new Date(item.date);  
            return [
              date,
              parseFloat(item.income), 
              parseFloat(item.outcome), 
              parseFloat(item.clear), 
            ];
          });
  
          console.log('Processed data for chart:', newData);
  
          setChartData([
            ['Date', 'Income', 'Outcome', 'Clear'],
            ...newData 
          ]);
        })
        .catch(error => console.error('Error fetching chart data:', error));
    }
  }, [startDate, endDate]);
  console.log(chartData); 

  return (
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData} 
        options={{
          hAxis: {
            title: 'Date',
            format: 'dd/MM/yyyy', 
            gridlines: { count: 15 },
          },
          vAxis: { title: 'Amount' },
          legend: { position: 'bottom', alignment: 'center' },
          series: {
            0: { color: 'red' },
            1: { color: 'blue' }, 
            2: { color: 'green' }, 
          },
        }}
      />
    </div>
  );
}

export default FinancialChart;