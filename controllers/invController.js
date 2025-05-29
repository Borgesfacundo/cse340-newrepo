const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* **************************************
 * Build inventory by classification view
 * *********************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* **************************************
 * Build a view for single cars
 * *********************************** */
invCont.buildSingleCar = async function (req, res, next) {
  const inv_id = req.params.inv_id;
  const data = await invModel.getSingleCar(inv_id);
  const car = data[0];
  let nav = await utilities.getNav();
  const singleview = await utilities.buildSingleCar(data);
  res.render("./inventory/single-car", {
    title: `${car.inv_year} ${car.inv_make} ${car.inv_model}`,
    nav,
    singleview,
  });
};

/* **************************************
 * Trigger an error for testing purposes (error 500 )
 * *********************************** */
invCont.triggerError = async function (req, res, next) {
  // Error 500
  const err = new Error("This is a test error");
  err.status = 500;
  throw err;
};
module.exports = invCont;
