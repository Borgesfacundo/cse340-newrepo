// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Route to build a view for single cars
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildSingleCar)
);

// Route to test error 500
router.get("/error-test", utilities.handleErrors(invController.triggerError));

module.exports = router;
