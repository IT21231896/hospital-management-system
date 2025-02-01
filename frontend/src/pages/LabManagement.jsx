import React, { useState } from "react";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../styles/ManagementStyles.css";

const LabManagement = () => {
  const [labTests, setLabTests] = useState([
    { id: 1, testName: "Blood Test", patientName: "John Doe", testDate: "2023-10-15", status: "Completed" },
    { id: 2, testName: "X-Ray", patientName: "Jane Smith", testDate: "2023-10-16", status: "Pending" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);

  // CRUD Operations
  const handleDelete = (id) => {
    setLabTests(labTests.filter(test => test.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTest = {
      id: currentTest ? currentTest.id : Date.now(),
      testName: formData.get("testName"),
      patientName: formData.get("patientName"),
      testDate: formData.get("testDate"),
      status: formData.get("status")
    };

    if (currentTest) {
      setLabTests(labTests.map(t => t.id === currentTest.id ? newTest : t));
    } else {
      setLabTests([...labTests, newTest]);
    }
    setIsModalOpen(false);
    setCurrentTest(null);
  };

  // Filter lab tests based on search
  const filteredLabTests = labTests.filter(test =>
    test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
      {/* Header and Search */}
      <div className="management-header">
        <h1>Lab Management</h1>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search lab tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <FiPlus /> Add Test
        </button>
      </div>

      {/* Lab Tests Table */}
      <table className="management-table">
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Patient Name</th>
            <th>Test Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLabTests.map(test => (
            <tr key={test.id}>
              <td>{test.testName}</td>
              <td>{test.patientName}</td>
              <td>{test.testDate}</td>
              <td>{test.status}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setCurrentTest(test);
                    setIsModalOpen(true);
                  }}
                >
                  <FiEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(test.id)}
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
            <h2>{currentTest ? "Edit Test" : "Add New Test"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="testName"
                placeholder="Test Name"
                defaultValue={currentTest?.testName || ""}
                required
              />
              <input
                type="text"
                name="patientName"
                placeholder="Patient Name"
                defaultValue={currentTest?.patientName || ""}
                required
              />
              <input
                type="date"
                name="testDate"
                placeholder="Test Date"
                defaultValue={currentTest?.testDate || ""}
                required
              />
              <select
                name="status"
                defaultValue={currentTest?.status || "Pending"}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setIsModalOpen(false);
                  setCurrentTest(null);
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

export default LabManagement;