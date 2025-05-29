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
  const inv_model = req.params.inv_model;
  const inv_year = req.params.inv_year;
  const data = await invModel.getSingleCar(inv_id);
  const car = data[0];
  if (!car) {
    return next({ status: 404, message: "Vehicle not found" });
  }
  let nav = await utilities.getNav();
  const singleview = await utilities.buildSingleCar(data);
  res.render("./inventory/single-car", {
    title: `${car.inv_year} ${car.inv_make} ${car.inv_model}`,
    nav,
    singleview,
  });
};

module.exports = invCont;
