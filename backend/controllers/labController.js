const Lab = require("../models/Lab");

// Add Lab Test
exports.addLabTest = async (req, res) => {
  const { testName, patientName, testDate, status } = req.body;
  try {
    const labTest = new Lab({ testName, patientName, testDate, status });
    await labTest.save();
    res.status(201).json(labTest);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Lab Tests
exports.getLabTests = async (req, res) => {
  try {
    const labTests = await Lab.find();
    res.status(200).json(labTests);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Lab Test
exports.updateLabTest = async (req, res) => {
  const { id } = req.params;
  const { testName, patientName, testDate, status } = req.body;
  try {
    const labTest = await Lab.findByIdAndUpdate(
      id,
      { testName, patientName, testDate, status },
      { new: true }
    );
    res.status(200).json(labTest);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Lab Test
exports.deleteLabTest = async (req, res) => {
  const { id } = req.params;
  try {
    await Lab.findByIdAndDelete(id);
    res.status(200).json({ message: "Lab test deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};