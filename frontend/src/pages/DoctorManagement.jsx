import React, { useState } from "react";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../styles/ManagementStyles.css";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Alice Brown", specialization: "Cardiology", contact: "alice@example.com", availability: "Mon-Fri" },
    { id: 2, name: "Dr. Bob Green", specialization: "Neurology", contact: "bob@example.com", availability: "Mon-Wed" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  // CRUD Operations
  const handleDelete = (id) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDoctor = {
      id: currentDoctor ? currentDoctor.id : Date.now(),
      name: formData.get("name"),
      specialization: formData.get("specialization"),
      contact: formData.get("contact"),
      availability: formData.get("availability")
    };

    if (currentDoctor) {
      setDoctors(doctors.map(d => d.id === currentDoctor.id ? newDoctor : d));
    } else {
      setDoctors([...doctors, newDoctor]);
    }
    setIsModalOpen(false);
    setCurrentDoctor(null);
  };

  // Filter doctors based on search
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
      {/* Header and Search */}
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

      {/* Doctor Table */}
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
            <tr key={doctor.id}>
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
                  onClick={() => handleDelete(doctor.id)}
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