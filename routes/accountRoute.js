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
 * Deliver Login View
 ********************/
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountManagement)
);

/* ********************
 * Show update account form
 *********************** */
router.get(
  "/update/:account_id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdateAccount)
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

// Procces the login attemp
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

//Update account information
router.post(
  "/update",
  regValidate.updateRules(),
  regValidate.checkUpdateData,
  utilities.checkLogin,
  utilities.handleErrors(accountController.updateAccount)
);

// Change password
router.post(
  "/update-password",
  regValidate.passwordRules(),
  regValidate.checkPasswordData,
  utilities.checkLogin,
  utilities.handleErrors(accountController.updatePassword)
);

// Logout route
router.get("/logout", utilities.handleErrors(accountController.accountLogout));

module.exports = router;
