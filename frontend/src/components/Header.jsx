import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiLogOut } from "react-icons/fi";
import "../styles/Header.css";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions (e.g., clear session, redirect to login)
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/dashboard" className="logo">
          AK Healthcare
        </Link>
        <nav className="nav-links">
          <Link to="/patient-management">Patient Management</Link>
          <Link to="/doctor-management">Doctor Management</Link>
          <Link to="/inventory-management">Inventory Management</Link>
          <Link to="/ward-management">Ward Management</Link>
          <Link to="/lab-management">Lab Management</Link>
        </nav>
      </div>
      <div className="header-right">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="user-profile" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <FiUser className="user-icon" />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;