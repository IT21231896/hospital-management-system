const express = require("express");
const {
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",authMiddleware, addDoctor);
router.get("/",authMiddleware, getDoctors);
router.put("/:id",authMiddleware, updateDoctor);
router.delete("/:id",authMiddleware, deleteDoctor);

module.exports = router;