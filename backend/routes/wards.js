const express = require("express");
const {
  addWard,
  getWards,
  updateWard,
  deleteWard,
} = require("../controllers/wardController");

const router = express.Router();

router.post("/", addWard);
router.get("/", getWards);
router.put("/:id", updateWard);
router.delete("/:id", deleteWard);

module.exports = router;