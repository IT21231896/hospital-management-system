import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import "../styles/ManagementStyles.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LabManagement = () => {
  const [labTests, setLabTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchLabTests();
  }, []);

  // Fetch lab tests
  const fetchLabTests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lab`, authHeader);
      setLabTests(response.data);
    } catch (error) {
      console.error("Error fetching lab tests:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This test will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_BASE_URL}/lab/${id}`, authHeader);
          setLabTests(labTests.filter((test) => test._id !== id));
          Swal.fire("Deleted!", "Lab test has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the lab test.", "error");
        }
      }
    });
  };

  // Handle Add/Edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTest = {
      testName: formData.get("testName"),
      patientName: formData.get("patientName"),
      testDate: formData.get("testDate"),
      status: formData.get("status"),
    };

    try {
      if (currentTest) {
        // Update existing test
        const response = await axios.put(`${API_BASE_URL}/lab/${currentTest._id}`, newTest, authHeader);
        setLabTests(labTests.map((t) => t._id === currentTest._id ? response.data : t));
        Swal.fire("Updated!", "Lab test has been updated.", "success");
      } else {
        // Add new test
        const response = await axios.post(`${API_BASE_URL}/lab`, newTest, authHeader);
        setLabTests([...labTests, response.data]);
        Swal.fire("Added!", "New lab test has been added.", "success");
      }
      setIsModalOpen(false);
      setCurrentTest(null);
      await fetchLabTests();
    } catch (error) {
      Swal.fire("Error!", "Failed to save lab test.", "error");
    }
  };

  // Filter lab tests
  const filteredLabTests = labTests.filter(
    (test) =>
      test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="management-container">
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
        <button className="add-btn" onClick={() => {
          setCurrentTest(null);
          setIsModalOpen(true);
        }}>
          <FiPlus /> Add Test
        </button>
      </div>

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
          {filteredLabTests.map((test) => (
            <tr key={test._id}>
              <td>{test.testName}</td>
              <td>{test.patientName}</td>
              <td>{new Date(test.testDate).toLocaleDateString("en-CA")}</td>
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
                  onClick={() => handleDelete(test._id)}
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
            <h2>{currentTest ? "Edit Test" : "Add New Test"}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="testName" placeholder="Test Name" defaultValue={currentTest?.testName || ""} required />
              <input type="text" name="patientName" placeholder="Patient Name" defaultValue={currentTest?.patientName || ""} required />
              <input
                type="date"
                name="testDate"
                defaultValue={currentTest?.testDate ? new Date(currentTest.testDate).toISOString().split("T")[0] : ""}
                required
              />
              <select name="status" defaultValue={currentTest?.status || "Pending"} required>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="modal-actions">
                <button type="button" onClick={() => {
                  setIsModalOpen(false);
                  setCurrentTest(null);
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

export default LabManagement;
