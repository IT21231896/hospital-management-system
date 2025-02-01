import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import "../styles/ManagementStyles.css";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/doctors`)
      .then(response => setDoctors(response.data))
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

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
        axios.delete(`${API_BASE_URL}/doctors/${id}`)
          .then(() => {
            setDoctors(doctors.filter(doctor => doctor._id !== id));
            Swal.fire("Deleted!", "Doctor has been removed.", "success");
          })
          .catch(error => Swal.fire("Error!", "Failed to delete doctor.", "error"));
      }
    });
  };

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
          axios.put(`${API_BASE_URL}/doctors/${currentDoctor._id}`, newDoctor)
            .then(response => {
              setDoctors(doctors.map(d => d._id === currentDoctor._id ? response.data : d));
              Swal.fire("Updated!", "Doctor details updated successfully.", "success");
            })
            .catch(error => Swal.fire("Error!", "Update failed.", "error"));
        }
      });
    } else {
      axios.post(`${API_BASE_URL}/doctors`, newDoctor)
        .then(response => {
          setDoctors([...doctors, response.data]);
          Swal.fire("Added!", "New doctor has been added successfully.", "success");
        })
        .catch(error => Swal.fire("Error!", "Failed to add doctor.", "error"));
    }

    setIsModalOpen(false);
    setCurrentDoctor(null);
  };

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
              <input type="text" name="name" placeholder="Name" defaultValue={currentDoctor?.name || ""} required />
              <input type="text" name="specialization" placeholder="Specialization" defaultValue={currentDoctor?.specialization || ""} required />
              <input type="email" name="contact" placeholder="Contact Email" defaultValue={currentDoctor?.contact || ""} required />
              <input type="text" name="availability" placeholder="Availability" defaultValue={currentDoctor?.availability || ""} required />
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