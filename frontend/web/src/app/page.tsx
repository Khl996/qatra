"use client"; // إضافة التوجيه لجعل المكون مكون عميل

import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Qatra</h1>
      <nav>
        <ul>
          <li>
            <Link to="/store-signup">Store Sign Up</Link>
          </li>
          <li>
            <Link to="/store-login">Store Login</Link>
          </li>
          <li>
            <Link to="/store-dashboard">Store Dashboard</Link>
          </li>
          <li>
            <Link to="/add-points">Add Points</Link>
          </li>
          <li>
            <Link to="/manage-offers">Manage Offers</Link>
          </li>
          <li>
            <Link to="/manage-products">Manage Products</Link>
          </li>
          <li>
            <Link to="/sales-reports">Sales Reports</Link>
          </li>
          <li>
            <Link to="/commission">Commission</Link>
          </li>
          <li>
            <Link to="/admin-login">Admin Login</Link>
          </li>
          <li>
            <Link to="/user-management">User Management</Link>
          </li>
          <li>
            <Link to="/store-management">Store Management</Link>
          </li>
          <li>
            <Link to="/ad-management">Ad Management</Link>
          </li>
          <li>
            <Link to="/discount-management">Discount Management</Link>
          </li>
          <li>
            <Link to="/financial-reports">Financial Reports</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
