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

// Show the form to add a new vehicle
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
);

// Process the form to add a new vehicle
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.processAddInventory)
);

// Show the form to edit a vehicle
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

// show the form to edit a vehicle
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.buildEditInventory)
);

// Process the form to update a vehicle
router.post(
  "/update/",
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);

// Show the form to delete a vehicle
router.get(
  "/delete/:inv_id",
  utilities.handleErrors(invController.buildDeleteInventory)
);

// Process the form to delete a vehicle
router.post("/delete", utilities.handleErrors(invController.deleteInventory));

module.exports = router;
