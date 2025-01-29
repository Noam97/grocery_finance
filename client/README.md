# Small Grocery Shop App

This is a **Single Page Application (SPA)** for managing and analyzing financial data of a **small grocery shop**. The application includes a **React frontend**, a **Node.js/Express backend**, and a **PostgreSQL (NeonDB) database**.

## Features
Display daily **income, outcome, and net revenue** on a line chart  
Filter data by **date range**  
Store data in a **PostgreSQL database (NeonDB cloud-based)**  
**REST API** for fetching financial data  

---

## Prerequisites
Before running the project, make sure you have:

- **[Node.js](https://nodejs.org/)** (16+ recommended)
- **[npm](https://www.npmjs.com/)** (comes with Node.js)
- **A NeonDB PostgreSQL database** (or any PostgreSQL-compatible database)

---

##  Set Up the Server (Backend)
cd server
npm install

#Configure Environment Variables
DB_URL=neon_database_connection_string (from .env file)
PORT=5000

# Run the Server
npm start

If successful, you should see:
Server is running on http://localhost:5000
Connected to NeonDB!

##Set Up the Client (Frontend)
cd ../client
npm install

# Run the React App
npm start

If successful, you should see:
Compiled successfully!
You can now view the app at: http://localhost:3000

How to Use
Open http://localhost:3000 in your browser.
The default date range (1.6.2021 - 31.12.2021) loads data automatically.
Use the date range filter to select a different period.
Click the "Filter" button to update the chart dynamically.