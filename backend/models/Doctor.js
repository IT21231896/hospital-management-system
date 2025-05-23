const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  contact: { type: String, required: true },
  availability: { type: String, required: true },
});

module.exports = mongoose.model("Doctor", doctorSchema);