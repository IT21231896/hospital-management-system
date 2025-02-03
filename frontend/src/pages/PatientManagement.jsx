import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import "../styles/ManagementStyles.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Replace with actual API URL

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/patients`)
      .then(response => setPatients(response.data))
      .catch(error => console.error("Error fetching patients:", error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_BASE_URL}/patients/${id}`)
          .then(() => {
            setPatients(patients.filter(patient => patient._id !== id));
            Swal.fire("Deleted!", "Patient record has been removed.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the patient.", "error");
          });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPatient = {
      name: formData.get("name"),
      age: formData.get("age"),
      contact: formData.get("contact"),
      diagnosis: formData.get("diagnosis"),
    };

    if (currentPatient) {
      axios.put(`${API_BASE_URL}/patients/${currentPatient._id}`, newPatient)
        .then(response => {
          setPatients(patients.map(p => (p._id === currentPatient._id ? response.data : p)));
          Swal.fire("Updated!", "Patient details have been updated.", "success");
        })
        .catch(() => Swal.fire("Error!", "Failed to update patient.", "error"));
    } else {
      axios.post(`${API_BASE_URL}/patients`, newPatient)
        .then(response => {
          setPatients([...patients, response.data]);
          Swal.fire("Added!", "New patient has been added.", "success");
        })
        .catch(() => Swal.fire("Error!", "Failed to add patient.", "error"));
    }

    setIsModalOpen(false);
    setCurrentPatient(null);
  };

  return (
    <div className="management-container">
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
          {patients.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase())).map(patient => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.contact}</td>
              <td>{patient.diagnosis}</td>
              <td>
                <button className="edit-btn" onClick={() => {
                  setCurrentPatient(patient);
                  setIsModalOpen(true);
                }}>
                  <FiEdit />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(patient._id)}>
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
            <h2>{currentPatient ? "Edit Patient" : "Add New Patient"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Name" defaultValue={currentPatient?.name || ""} required />
              <input type="number" name="age" placeholder="Age" defaultValue={currentPatient?.age || ""} required />
              <input type="email" name="contact" placeholder="Contact Email" defaultValue={currentPatient?.contact || ""} required />
              <input type="text" name="diagnosis" placeholder="Diagnosis" defaultValue={currentPatient?.diagnosis || ""} required />
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setIsModalOpen(false);
                  setCurrentPatient(null);
                }}>Cancel</button>
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
