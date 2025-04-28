const express = require("express");
const {
  addInventory,
  getInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addInventory);
router.get("/", authMiddleware, getInventory);
router.put("/:id",authMiddleware, updateInventory);
router.delete("/:id",authMiddleware, deleteInventory);

module.exports = router;