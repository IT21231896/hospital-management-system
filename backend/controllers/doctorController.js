const Doctor = require("../models/Doctor");

// Add Doctor
exports.addDoctor = async (req, res) => {
  const { name, specialization, contact, availability } = req.body;
  try {
    const doctor = new Doctor({ name, specialization, contact, availability });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Doctor
exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, specialization, contact, availability } = req.body;
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { name, specialization, contact, availability },
      { new: true }
    );
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Doctor
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};