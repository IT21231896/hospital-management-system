const Patient = require("../models/Patient");

// Add Patient
exports.addPatient = async (req, res) => {
  const { name, age, contact, diagnosis } = req.body;
  try {
    const patient = new Patient({ name, age, contact, diagnosis });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Patient
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, age, contact, diagnosis } = req.body;
  try {
    const patient = await Patient.findByIdAndUpdate(
      id,
      { name, age, contact, diagnosis },
      { new: true }
    );
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Patient
exports.deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: "Patient deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};