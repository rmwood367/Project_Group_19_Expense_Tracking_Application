import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Link to the CSS file for styling
import SpendingChart from "./SpendingChart"; // Corrected path

const Home = () => 
{
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="header">
        <div className="nav-buttons">
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/account")}>Account</button>
        </div>
        <h1 className="welcome">Welcome Back to Bank</h1>
        <div className="auth-buttons">
          <button onClick={() => navigate("/signin")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </header>

      <section className="account-overview">
        <div className="accounts">
          <button>Account 1234</button>
          <button>Account 1234</button>
          <button>Account 1234</button>
          <button>Savings 1234</button>
          <button>Savings 1234</button>
        </div>
        <div className="spending">
          <h3>Spending</h3>
          <SpendingChart />
          <button>Trends</button>
        </div>
      </section>

      <section className="transactions-transfer">
        <div className="transactions">
          <h3>Recent Transactions</h3>
          <button>Transaction</button>
          <button>Transaction</button>
          <button>Transaction</button>
          <button>Transaction</button>
          <button>Transaction</button>
          <button>See All Transactions</button>
        </div>
        <div className="transfer">
          <h3>Transfer</h3>
          <button>Account 1234</button>
          <button>Account 1234</button>
          <button>Account 1234</button>
        </div>
      </section>

      <section className="categories">
        <div className="category-box">Category</div>
        <div className="category-box">Category</div>
        <div className="category-box">Category</div>
        <div className="category-box">Category</div>
      </section>
    </div>
  );
};

export default Home;