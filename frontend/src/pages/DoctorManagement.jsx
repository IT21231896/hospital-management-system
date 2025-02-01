import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import "../styles/ManagementStyles.css";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  // Fetch doctors from API
  useEffect(() => {
    axios.get(`${API_BASE_URL}/doctors`)
      .then(response => setDoctors(response.data))
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

  // Handle delete operation
  const handleDelete = (id) => {
    axios.delete(`${API_BASE_URL}/doctors/${id}`)
      .then(() => setDoctors(doctors.filter(doctor => doctor._id !== id)))
      .catch(error => console.error("Error deleting doctor:", error));
  };

  // Handle form submit for add/edit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDoctor = {
      name: formData.get("name"),
      specialization: formData.get("specialization"),
      contact: formData.get("contact"),
      availability: formData.get("availability")
    };

    if (currentDoctor) {
      axios.put(`${API_BASE_URL}/doctors/${currentDoctor._id}`, newDoctor)
        .then(response => {
          setDoctors(doctors.map(d => d._id === currentDoctor._id ? response.data : d));
        })
        .catch(error => console.error("Error updating doctor:", error));
    } else {
      axios.post(`${API_BASE_URL}/doctors`, newDoctor)
        .then(response => setDoctors([...doctors, response.data]))
        .catch(error => console.error("Error adding doctor:", error));
    }

    setIsModalOpen(false);
    setCurrentDoctor(null);
  };

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
      <div className="management-header">
        <h1>Doctor Management</h1>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <FiPlus /> Add Doctor
        </button>
      </div>

      <table className="management-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Contact</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map(doctor => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.contact}</td>
              <td>{doctor.availability}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setCurrentDoctor(doctor);
                    setIsModalOpen(true);
                  }}
                >
                  <FiEdit />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(doctor._id)}>
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{currentDoctor ? "Edit Doctor" : "Add New Doctor"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={currentDoctor?.name || ""}
                required
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                defaultValue={currentDoctor?.specialization || ""}
                required
              />
              <input
                type="email"
                name="contact"
                placeholder="Contact Email"
                defaultValue={currentDoctor?.contact || ""}
                required
              />
              <input
                type="text"
                name="availability"
                placeholder="Availability"
                defaultValue={currentDoctor?.availability || ""}
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setIsModalOpen(false);
                  setCurrentDoctor(null);
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

export default DoctorManagement;