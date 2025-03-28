// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build a single view of an item
router.get("/detail/:invId", invController.buildItemView);

module.exports = router;
