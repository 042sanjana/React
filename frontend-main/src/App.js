import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Balance from "./pages/Balance";
import Credit from "./pages/Credit";
import Debit from "./pages/Debit";
import History from "./pages/History";
import Profile from "./pages/Profile";
import WalletCard from "./components/WalletCard";
import "./components/WalletCard.css";
import Sidebar from "./components/Sidebar";
import "./pages/Profile.css";
import "./pages/Dashboard.css";
import "./pages/History.css";

// AUTH PAGES
import Login from "./Login";
import Register from "./Register";
import SetPin from "./SetPin";
import VerifyPin from "./VerifyPin";

// CSS
import "./App.css";
import "./Login.css";

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

          {/* WALLET */}

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/balance" element={<Balance />} />

          <Route path="/credit" element={<Credit />} />

          <Route path="/debit" element={<Debit />} />

          <Route path="/history" element={<History />} />

          <Route path="/profile" element={<Profile />} />

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