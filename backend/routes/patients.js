const express = require("express");
const {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

const router = express.Router();

router.post("/", addPatient);
router.get("/", getPatients);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

module.exports = router;