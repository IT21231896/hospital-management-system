import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../styles/ManagementStyles.css";

// API Base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch all doctors
  useEffect(() => {
    axios.get(`${API_BASE_URL}/doctors`, authHeader)
      .then(response => setDoctors(response.data))
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_BASE_URL}/doctors/${id}`, authHeader)
          .then(() => {
            setDoctors(doctors.filter(doctor => doctor._id !== id));
            Swal.fire("Deleted!", "Doctor has been removed.", "success");
          })
          .catch(error => Swal.fire("Error!", "Failed to delete doctor.", "error"));
      }
    });
  };

  // Handle Add / Update
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
      // Update Existing Doctor
      Swal.fire({
        title: "Confirm Update",
        text: "Are you sure you want to update this doctor's details?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put(`${API_BASE_URL}/doctors/${currentDoctor._id}`, newDoctor, authHeader)
            .then(response => {
              setDoctors(doctors.map(d => d._id === currentDoctor._id ? response.data : d));
              Swal.fire("Updated!", "Doctor details updated successfully.", "success");
              setIsModalOpen(false);
              setCurrentDoctor(null);
            })
            .catch(error => Swal.fire("Error!", "Update failed.", "error"));
        }
      });
    } else {
      // Add New Doctor
      axios.post(`${API_BASE_URL}/doctors`, newDoctor, authHeader)
        .then(response => {
          setDoctors([...doctors, response.data]);
          Swal.fire("Added!", "New doctor has been added successfully.", "success");
          setIsModalOpen(false);
          setCurrentDoctor(null);
        })
        .catch(error => Swal.fire("Error!", "Failed to add doctor.", "error"));
    }
  };

  // Filter doctors based on search
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
        <button className="add-btn" onClick={() => {
          setCurrentDoctor(null);
          setIsModalOpen(true);
        }}>
          <FiPlus /> Add Doctor
        </button>
      </div>

      {/* Doctors Table */}
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
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(doctor._id)}
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
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
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentDoctor(null);
                  }}
                >
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
