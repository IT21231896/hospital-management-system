const Ward = require("../models/Ward");

// Add Ward
exports.addWard = async (req, res) => {
  const { name, totalBeds, occupiedBeds, type } = req.body;
  try {
    const ward = new Ward({ name, totalBeds, occupiedBeds, type });
    await ward.save();
    res.status(201).json(ward);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Wards
exports.getWards = async (req, res) => {
  try {
    const wards = await Ward.find();
    res.status(200).json(wards);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Ward
exports.updateWard = async (req, res) => {
  const { id } = req.params;
  const { name, totalBeds, occupiedBeds, type } = req.body;
  try {
    const ward = await Ward.findByIdAndUpdate(
      id,
      { name, totalBeds, occupiedBeds, type },
      { new: true }
    );
    res.status(200).json(ward);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Ward
exports.deleteWard = async (req, res) => {
  const { id } = req.params;
  try {
    await Ward.findByIdAndDelete(id);
    res.status(200).json({ message: "Ward deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};