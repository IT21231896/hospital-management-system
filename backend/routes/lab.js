const express = require("express");
const {
  addLabTest,
  getLabTests,
  updateLabTest,
  deleteLabTest,
} = require("../controllers/labController");

const router = express.Router();

router.post("/", addLabTest);
router.get("/", getLabTests);
router.put("/:id", updateLabTest);
router.delete("/:id", deleteLabTest);

module.exports = router;