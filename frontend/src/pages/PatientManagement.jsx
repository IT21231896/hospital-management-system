import React, { useState } from "react";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../styles/ManagementStyles.css";

const PatientManagement = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 35, contact: "john@example.com", diagnosis: "Fever" },
    { id: 2, name: "Jane Smith", age: 28, contact: "jane@example.com", diagnosis: "Migraine" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // CRUD Operations
  const handleDelete = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPatient = {
      id: currentPatient ? currentPatient.id : Date.now(),
      name: formData.get("name"),
      age: formData.get("age"),
      contact: formData.get("contact"),
      diagnosis: formData.get("diagnosis")
    };

    if (currentPatient) {
      setPatients(patients.map(p => p.id === currentPatient.id ? newPatient : p));
    } else {
      setPatients([...patients, newPatient]);
    }
    setIsModalOpen(false);
    setCurrentPatient(null);
  };

  // Filter patients based on search
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
      {/* Header and Search */}
      <div className="management-header">
        <h1>Patient Management</h1>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <FiPlus /> Add Patient
        </button>
      </div>

      {/* Patient Table */}
      <table className="management-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Diagnosis</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.contact}</td>
              <td>{patient.diagnosis}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setCurrentPatient(patient);
                    setIsModalOpen(true);
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(patient.id)}
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{currentPatient ? "Edit Patient" : "Add New Patient"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={currentPatient?.name || ""}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                defaultValue={currentPatient?.age || ""}
                required
              />
              <input
                type="email"
                name="contact"
                placeholder="Contact Email"
                defaultValue={currentPatient?.contact || ""}
                required
              />
              <input
                type="text"
                name="diagnosis"
                placeholder="Diagnosis"
                defaultValue={currentPatient?.diagnosis || ""}
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setIsModalOpen(false);
                  setCurrentPatient(null);
                }}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;