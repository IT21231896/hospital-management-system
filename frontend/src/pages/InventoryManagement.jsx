import React, { useState } from "react";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../styles/ManagementStyles.css";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Paracetamol", quantity: 100, supplier: "MediCorp", expiryDate: "2024-12-31" },
    { id: 2, name: "Bandages", quantity: 50, supplier: "HealthPlus", expiryDate: "2025-06-30" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // CRUD Operations
  const handleDelete = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: currentItem ? currentItem.id : Date.now(),
      name: formData.get("name"),
      quantity: formData.get("quantity"),
      supplier: formData.get("supplier"),
      expiryDate: formData.get("expiryDate")
    };

    if (currentItem) {
      setInventory(inventory.map(i => i.id === currentItem.id ? newItem : i));
    } else {
      setInventory([...inventory, newItem]);
    }
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  // Filter inventory based on search
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          {filteredInventory.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.supplier}</td>
              <td>{item.expiryDate}</td>
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
                  onClick={() => handleDelete(item.id)}
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
                defaultValue={currentItem?.expiryDate || ""}
                required
              />
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setIsModalOpen(false);
                  setCurrentItem(null);
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

export default InventoryManagement;