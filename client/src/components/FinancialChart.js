import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import './style/FinancialChart.css';

function FinancialChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([['Date', 'Income', 'Outcome', 'Clear']]);
  const [showNoDataModal, setShowNoDataModal] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      axios.get('http://localhost:5000/api/data', {
        params: { start: startDate, end: endDate }
      })
        .then(response => {
          const data = response.data;

          if (data.length === 0) {
            setShowNoDataModal(true);
            setChartData([
              ['Date', 'Income', 'Outcome', 'Clear'],
              [new Date(), 0, 0, 0]
            ]);
            return;
          }

          const newData = data.map(item => {
            const date = new Date(item.date);
            return [
              date,
              parseFloat(item.income),
              parseFloat(item.outcome),
              parseFloat(item.clear),
            ];
          });

          setChartData([['Date', 'Income', 'Outcome', 'Clear'], ...newData]);
          setShowNoDataModal(false); 
        })
        .catch(error => {
          console.error('Error fetching chart data:', error);
          setShowNoDataModal(true); 
        });
    }
  }, [startDate, endDate]);

  return (
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
        options={{
          hAxis: { title: 'Date', format: 'dd/MM/yyyy' },
          vAxis: { title: 'Amount' },
          legend: { position: 'bottom', alignment: 'center' },
          series: {
            0: { color: 'red' },
            1: { color: 'blue' },
            2: { color: 'green' },
          },
        }}
      />

      {showNoDataModal && (
        <div className="modal">
          <div className="modal-content">
            <p>No data available for the selected date range.</p>
            <button className="close-btn" onClick={() => setShowNoDataModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinancialChart;
