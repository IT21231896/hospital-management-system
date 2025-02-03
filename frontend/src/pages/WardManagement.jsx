import React, { useState, useEffect } from "react";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/ManagementStyles.css";

const WardManagement = () => {
  const [wards, setWards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWard, setCurrentWard] = useState(null);

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/wards");
      setWards(response.data);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/wards/${id}`);
          setWards(wards.filter((ward) => ward._id !== id));
          Swal.fire("Deleted!", "The ward has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting ward:", error);
          Swal.fire("Error!", "Failed to delete ward.", "error");
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newWard = {
      name: formData.get("name"),
      totalBeds: formData.get("totalBeds"),
      occupiedBeds: formData.get("occupiedBeds"),
      type: formData.get("type"),
    };

    try {
      if (currentWard) {
        await axios.put(`http://localhost:5000/api/wards/${currentWard._id}`, newWard);
        fetchWards();
        Swal.fire("Updated!", "Ward details updated successfully.", "success");
      } else {
        await axios.post("http://localhost:5000/api/wards", newWard);
        fetchWards();
        Swal.fire("Added!", "New ward added successfully.", "success");
      }
      setIsModalOpen(false);
      setCurrentWard(null);
    } catch (error) {
      console.error("Error saving ward:", error);
      Swal.fire("Error!", "Failed to save ward details.", "error");
    }
  };

  const filteredWards = wards.filter((ward) =>
    ward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
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
          {filteredWards.map((ward) => (
            <tr key={ward._id}>
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
                <button className="delete-btn" onClick={() => handleDelete(ward._id)}>
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
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentWard(null);
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

export default WardManagement;
