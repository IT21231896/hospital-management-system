import React from "react";
import { Link } from "react-router-dom";
import { FaUserInjured, FaUserMd, FaPills, FaBed, FaFlask } from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>AK Healthcare Dashboard</h1>
        <p>Welcome to the Hospital Management System</p>
      </header>
      <div className="dashboard-grid">
        <Link to="/patient-management" className="dashboard-card">
          <FaUserInjured className="dashboard-icon" />
          <h2>Patient Management</h2>
          <p>Manage patient records, appointments, and history.</p>
        </Link>
        <Link to="/doctor-management" className="dashboard-card">
          <FaUserMd className="dashboard-icon" />
          <h2>Doctor Management</h2>
          <p>Manage doctor profiles, schedules, and availability.</p>
        </Link>
        <Link to="/inventory-management" className="dashboard-card">
          <FaPills className="dashboard-icon" />
          <h2>Inventory Management</h2>
          <p>Track medicine stock, supplies, and pharmacy sales.</p>
        </Link>
        <Link to="/ward-management" className="dashboard-card">
          <FaBed className="dashboard-icon" />
          <h2>Ward Management</h2>
          <p>Manage bed allocation, admissions, and transfers.</p>
        </Link>
        <Link to="/lab-management" className="dashboard-card">
          <FaFlask className="dashboard-icon" />
          <h2>Lab Management</h2>
          <p>Manage lab tests, results, and diagnostic imaging.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;