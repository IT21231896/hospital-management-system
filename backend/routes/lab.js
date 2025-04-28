const express = require("express");
const {
  addLabTest,
  getLabTests,
  updateLabTest,
  deleteLabTest,
} = require("../controllers/labController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addLabTest);
router.get("/", authMiddleware, getLabTests);
router.put("/:id",authMiddleware,  updateLabTest);
router.delete("/:id",authMiddleware,  deleteLabTest);

module.exports = router;