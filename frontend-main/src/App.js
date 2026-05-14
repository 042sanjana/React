import React, { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

// EXISTING PAGES
import Dashboard from "./pages/Dashboard";

import Credit from "./pages/Credit";
import Debit from "./pages/Debit";

import Profile from "./pages/Profile";

// EXISTING COMPONENTS
import WalletCard from "./components/WalletCard";
import Sidebar from "./components/Sidebar";

// AUTH PAGES
import Login from "./Login";
import Register from "./Register";
import SetPin from "./SetPin";
import VerifyPin from "./VerifyPin";

// NEW TRANSACTION COMPONENTS
import Navbar from "./components/Navbar";
import TransferForm from "./components/TransferForm";
import TransactionList from "./components/TransactionList";
import ChartSection from "./components/ChartSection";
import Transfer from "./pages/Transfer";
import Transaction from "./pages/Transaction";
// CSS
import "./App.css";
import "./Login.css";
import "./components/WalletCard.css";
import "./pages/Profile.css";
import "./pages/Dashboard.css";
import WalletHistory from "./pages/WalletHistory";


// NEW CSS
import "./components/Navbar.css";
import "./components/TransferForm.css";
import "./components/TransactionList.css";
import "./components/ChartSection.css";
import ExpenseChart from "./pages/ExpenseChart";


function TransactionsPage() {

  const [transactions, setTransactions] = useState([]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  return (
    <div className="app">

      <Navbar />

      <div className="main-container">

        <div className="left-section">

          <TransferForm addTransaction={addTransaction} />

          <ChartSection transactions={transactions} />

        </div>

        <div className="right-section">

          <TransactionList transactions={transactions} />

        </div>

      </div>

    </div>
  );
}

function Layout() {

  const location = useLocation();

  const hideSidebar =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname === "/set-pin" ||
    location.pathname === "/verify-pin";

  return (

    <div className="layout">

      {!hideSidebar && <Sidebar />}

      <div className="content">

        <Routes>

          {/* AUTH */}

          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/set-pin" element={<SetPin />} />

          <Route path="/verify-pin" element={<VerifyPin />} />
<Route
  path="/transaction"
  element={<Transaction />}
/>
          {/* WALLET */}

          <Route path="/dashboard" element={<Dashboard />} />

<Route path="/expenseChart" element={<ExpenseChart />} />
<Route
  path="/wallet-history"
  element={<WalletHistory />}
/>

          <Route path="/credit" element={<Credit />} />

          <Route path="/debit" element={<Debit />} />


          <Route
            path="/transaction"
            element={<Transaction />}
          />

          <Route path="/profile" element={<Profile />} />
<Route path="/transfer" element={<Transfer />} />

          {/* NEW TRANSACTION PAGE */}

          <Route
            path="/transaction"
            element={<Transaction/>}
          />

        </Routes>

      </div>

    </div>
  );
}

function App() {

  return (

    <BrowserRouter>

      <Layout />

    </BrowserRouter>

  );
}

export default App;