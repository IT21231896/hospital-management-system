const Inventory = require("../models/Inventory");

// Add Inventory Item
exports.addInventory = async (req, res) => {
  const { name, quantity, supplier, expiryDate } = req.body;
  try {
    const inventory = new Inventory({ name, quantity, supplier, expiryDate });
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Inventory Items
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Inventory Item
exports.updateInventory = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, supplier, expiryDate } = req.body;
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      id,
      { name, quantity, supplier, expiryDate },
      { new: true }
    );
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Inventory Item
exports.deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    await Inventory.findByIdAndDelete(id);
    res.status(200).json({ message: "Inventory item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};