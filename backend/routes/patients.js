const express = require("express");
const {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",authMiddleware, addPatient);
router.get("/",authMiddleware, getPatients);
router.put("/:id",authMiddleware, updatePatient);
router.delete("/:id",authMiddleware, deletePatient);

module.exports = router;