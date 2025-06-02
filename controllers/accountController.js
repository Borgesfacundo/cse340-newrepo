const utilities = require("../utilities/");

/* *******************************
 * Deliver Login View
 * ***************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/login", {
    title: "Login",
    nav,
  });
}

/* *******************************
 * Deliver Registration View
 * ***************************** */
async function buildRegister(req, res, next) {
  let nav = utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  });
}

module.exports = { buildLogin, buildRegister };
