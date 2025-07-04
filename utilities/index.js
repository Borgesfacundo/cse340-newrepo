const invModel = require("../models/inventory-model");
const Util = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ******************************
 * Contructs the nav HTML unordered list
 ******************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehickes">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* **************************************
 * Build the single car view HTML
 * ************************************ */
Util.buildSingleCar = async function (data) {
  let car = data[0];
  let grid = '<div class="single-view-container">';
  grid += '<div class="car-image">';
  grid +=
    '<img src="' +
    car.inv_image +
    '" alt="Image of ' +
    car.inv_make +
    " " +
    car.inv_model +
    ' on CSE Motors" />';
  grid += "</div>";
  grid += '<div class="car-details">';
  grid += `<h2> ${car.inv_make} ${car.inv_model} Details </h2>`;
  grid +=
    "<p><b>Price: </b> $" +
    new Intl.NumberFormat("en-US").format(car.inv_price) +
    "</p>";
  grid += `<p><b>Description: </b> ${car.inv_description}</p>`;
  grid += `<p><b>Color: </b> ${car.inv_color}</p>`;
  grid += `<p><b>Miles: </b> ${car.inv_miles.toLocaleString()}</p>`;
  //Add link to repair details
  grid += `<a href="/inv/repairs/${car.inv_id}" class="repair-link">View Repair History</a>`;
  grid += "</div>";
  grid += "</div>";
  return grid;
};

/* **************************************
 * Build the classification list HTML
 * ************************************ */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications();
  let classificationList =
    '<select name="classification_id" id="classificationList" required>';
  classificationList += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"';
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected";
    }
    classificationList += ">" + row.classification_name + "</option>";
  });
  classificationList += "</select>";
  return classificationList;
};

/* **************************************
 * Middleware For Handling Errors
 * Wrap other functions in this for
 * General Error Handling
 * ************************************ */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* **************************************
 * Middleware to check token validity
 * ************************************ */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("Please log in");
          res.clearCookie("jwt");
          return res.redirect("/account/login");
        }
        res.locals.accountData = accountData;
        res.locals.loggedIn = 1;
        next();
      }
    );
  } else {
    next();
  }
};

/* **************************************
 * Middleware to check if user is logged in
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedIn) {
    next();
  } else {
    req.flash("notice", "Please log in.");
    return res.redirect("/account/login");
  }
};

/* *****************************
 * Middleware to check account type
 * ***************************** */
Util.checkAccountType = (req, res, next) => {
  const type = req.session.account_type;
  if (type === "Employee" || type === "Admin") {
    return next();
  }
  req.flash("notice", "You must be an employer or admin to access this page.");
  return res.redirect("/account/login");
};

module.exports = Util;
