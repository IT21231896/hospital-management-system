const express = require("express");
const {
  addWard,
  getWards,
  updateWard,
  deleteWard,
} = require("../controllers/wardController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",authMiddleware, addWard);
router.get("/",authMiddleware, getWards);
router.put("/:id",authMiddleware, updateWard);
router.delete("/:id",authMiddleware, deleteWard);

module.exports = router;