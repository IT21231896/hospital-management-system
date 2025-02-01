// frontend/src/pages/WardManagement.jsx
import React, { useState } from "react";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../styles/ManagementStyles.css";

const WardManagement = () => {
  const [wards, setWards] = useState([
    { id: 1, name: "ICU", totalBeds: 10, occupiedBeds: 5, type: "Critical Care" },
    { id: 2, name: "General", totalBeds: 20, occupiedBeds: 8, type: "General Ward" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWard, setCurrentWard] = useState(null);

  // CRUD Operations
  const handleDelete = (id) => {
    setWards(wards.filter(ward => ward.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newWard = {
      id: currentWard ? currentWard.id : Date.now(),
      name: formData.get("name"),
      totalBeds: formData.get("totalBeds"),
      occupiedBeds: formData.get("occupiedBeds"),
      type: formData.get("type")
    };

    if (currentWard) {
      setWards(wards.map(w => w.id === currentWard.id ? newWard : w));
    } else {
      setWards([...wards, newWard]);
    }
    setIsModalOpen(false);
    setCurrentWard(null);
  };

  // Filter wards based on search
  const filteredWards = wards.filter(ward =>
    ward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
      {/* Header and Search */}
      <div className="management-header">
        <h1>Ward Management</h1>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search wards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <FiPlus /> Add Ward
        </button>
      </div>

      {/* Ward Table */}
      <table className="management-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Beds</th>
            <th>Occupied Beds</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWards.map(ward => (
            <tr key={ward.id}>
              <td>{ward.name}</td>
              <td>{ward.totalBeds}</td>
              <td>{ward.occupiedBeds}</td>
              <td>{ward.type}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setCurrentWard(ward);
                    setIsModalOpen(true);
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(ward.id)}
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
            <h2>{currentWard ? "Edit Ward" : "Add New Ward"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Ward Name"
                defaultValue={currentWard?.name || ""}
                required
              />
              <input
                type="number"
                name="totalBeds"
                placeholder="Total Beds"
                defaultValue={currentWard?.totalBeds || ""}
                required
              />
              <input
                type="number"
                name="occupiedBeds"
                placeholder="Occupied Beds"
                defaultValue={currentWard?.occupiedBeds || ""}
                required
              />
              <input
                type="text"
                name="type"
                placeholder="Ward Type"
                defaultValue={currentWard?.type || ""}
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setIsModalOpen(false);
                  setCurrentWard(null);
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

export default WardManagement;
