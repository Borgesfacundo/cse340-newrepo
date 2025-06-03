// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");
const invValidate = require("../utilities/inventory-validation");

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

// Management view route
router.get("/", utilities.handleErrors(invController.buildManagement));

// Show the form to add a new classification
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
);

//Process the form to add a new classification
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.processAddClassification)
);

module.exports = router;
