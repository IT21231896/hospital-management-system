const mongoose = require("mongoose");

const labSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  patientName: { type: String, required: true },
  testDate: { type: Date, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Lab", labSchema);