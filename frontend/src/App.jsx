import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PatientManagement from "./pages/PatientManagement";
import DoctorManagement from "./pages/DoctorManagement";
import InventoryManagement from "./pages/InventoryManagement";
import WardManagement from "./pages/WardManagement";
import LabManagement from "./pages/LabManagement";
import "./App.css";

// Protect Routes if no token
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Redirect: if go to / directly, go to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/patient-management" element={<PatientManagement />} />
                  <Route path="/doctor-management" element={<DoctorManagement />} />
                  <Route path="/inventory-management" element={<InventoryManagement />} />
                  <Route path="/ward-management" element={<WardManagement />} />
                  <Route path="/lab-management" element={<LabManagement />} />
                </Routes>
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
