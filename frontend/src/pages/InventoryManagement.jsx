import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import "../styles/ManagementStyles.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  // Fetch inventory from API
  const fetchInventory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inventory`);
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  // Handle delete with SweetAlert
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_BASE_URL}/inventory/${id}`);
          setInventory(inventory.filter((item) => item._id !== id));
          Swal.fire("Deleted!", "Item has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the item.", "error");
        }
      }
    });
  };

  // Handle form submit (add/edit item)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      name: formData.get("name"),
      quantity: formData.get("quantity"),
      supplier: formData.get("supplier"),
      expiryDate: formData.get("expiryDate"),
    };

    try {
      if (currentItem) {
        // Update existing item
        await axios.put(`${API_BASE_URL}/inventory/${currentItem._id}`, newItem);
        setInventory(inventory.map((item) => (item.id === currentItem._id ? newItem : item)));
        Swal.fire("Updated!", "Inventory item has been updated.", "success");
      } else {
        // Add new item
        const response = await axios.post(`${API_BASE_URL}/inventory`, newItem);
        setInventory([...inventory, response.data]);
        Swal.fire("Added!", "New item has been added.", "success");
      }
      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      Swal.fire("Error!", "Failed to save the item.", "error");
    }
    await fetchInventory();
  };

  // Filter inventory based on search term
  const filteredInventory = inventory.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
      {/* Header and Search */}
      <div className="management-header">
        <h1>Inventory Management</h1>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <FiPlus /> Add Item
        </button>
      </div>

      {/* Inventory Table */}
      <table className="management-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.supplier}</td>
              <td>{new Date(item.expiryDate).toLocaleDateString("en-CA")}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setCurrentItem(item);
                    setIsModalOpen(true);
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
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
            <h2>{currentItem ? "Edit Item" : "Add New Item"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                defaultValue={currentItem?.name || ""}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                defaultValue={currentItem?.quantity || ""}
                required
              />
              <input
                type="text"
                name="supplier"
                placeholder="Supplier"
                defaultValue={currentItem?.supplier || ""}
                required
              />
              <input
                type="date"
                name="expiryDate"
                placeholder="Expiry Date"
                defaultValue={currentItem?.expiryDate ? new Date(currentItem.expiryDate).toISOString().split("T")[0] : ""}
                required
              />
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentItem(null);
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

export default InventoryManagement;
