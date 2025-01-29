import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

function FinancialChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([
    ['Date', 'Income', 'Outcome', 'Clear'], // כותרות העמודות לנתונים
  ]);

  useEffect(() => {
    if (startDate && endDate) {
      axios.get('http://localhost:5000/api/data', {
        params: { start: startDate, end: endDate }
      })
        .then(response => {
          console.log('Received data from API:', response.data); // הדפסת הנתונים שהתקבלו
          const data = response.data;
  
          // אם יש צורך להמיר את הערכים בצורה מתאימה עבור הגרף
          const newData = data.map(item => {
            const date = new Date(item.date);
            const formattedDate = date.toISOString().split('T')[0]; // הסר את הזמן והשאר רק את התאריך
            return [
              formattedDate, // תאריך בגרף בצורה yyyy-MM-dd
              parseFloat(item.income),
              parseFloat(item.outcome),
              parseFloat(item.clear),
            ];
          });
          
          // הדפס את הנתונים לפני שליחתם לגרף
          console.log('Processed data for chart:', newData);
  
          // עדכון chartData
          setChartData([
            ['Date', 'Income', 'Outcome', 'Clear'], // ראשי העמודות
            ...newData // הוספת הנתונים שהתקבלו מה-API
          ]);
        })
        .catch(error => console.error('Error fetching chart data:', error));
    }
  }, [startDate, endDate]); // תלות ב-startDate ו-endDate
  

  console.log(chartData); // הדפסת chartData אחרי העדכון

  return (
    <div>
      <h2>Financial Data Chart</h2>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData} // כאן כל הנתונים (כולל כותרת) נשלחים לגרף
        options={{
          title: 'Financial Data',
          hAxis: {
            title: 'Date',
            format: 'yyyy-MM-dd', // הגדרת פורמט התאריך
            gridlines: { count: 15 },
          },
          vAxis: { title: 'Amount' },
          series: {
            0: { color: 'red' }, // הכנסה
            1: { color: 'blue' }, // הוצאה
            2: { color: 'green' }, // רווח
          },
        }}
      />
    </div>
  );
}

export default FinancialChart;
