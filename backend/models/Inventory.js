const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  supplier: { type: String, required: true },
  expiryDate: { type: Date, required: true },
});

module.exports = mongoose.model("Inventory", inventorySchema);