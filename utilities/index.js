const invModel = require("../models/inventory-model");
const Util = {};

/* ***********************
 * Build the classification view HTML
 * ************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id ="inv-display">';
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

/* ***********************
 * Build the single item view HTML
 ************************** */
Util.buildItemView = async function (data) {
  let item = '<div class="indiv-vehicle-container">';
  item += '<div id="vehicle-image">';
  item +=
    '<img src="' +
    data.inv_image +
    '" alt="Image of ' +
    data.inv_make +
    " " +
    data.inv_model +
    ' on CSE Motors" />';
  item += "</div>";
  item += '<div class="vehicleDetails">';
  item += "<hr />";
  item += "<h2>";
  item += `${data.inv_make} ${data.inv_model} Details`;
  item += "</h2>";
  item +=
    "<strong>" +
    "Price: " +
    "$" +
    new Intl.NumberFormat("en-US").format(data.inv_price) +
    " </strong>" +
    "<hr>";
  item +=
    "<strong>Description: </strong>" +
    '<span class="description">' +
    data.inv_description +
    "</span> <hr>";
  item += "<strong>Color: </strong> " + data.inv_color + "<hr>";
  item +=
    "<strong>Miles: </strong> " +
    new Intl.NumberFormat("en-US").format(data.inv_miles);
  item += "</div>";
  item += "</div>";
  return item;
};

/* ***********************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  console.log(data);
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title=See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* ***********************
 * Middleware For Handling Errors
 * Wrap other function in this for
 *  * General Error Handling
 * ************************ */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
