// Needed resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Route to build the login view when 'My Account' is clicked
router.get("/login", utilities.handleErrors(accountController.buildLogin));

/* ********************
 * Deliver Registration View
 ********************/
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

/* ********************
 * Handle Registration
 ********************/
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  // Handle errors and continue with registration
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;
