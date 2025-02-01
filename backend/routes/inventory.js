const express = require("express");
const {
  addInventory,
  getInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

const router = express.Router();

router.post("/", addInventory);
router.get("/", getInventory);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);

module.exports = router;