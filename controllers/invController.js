const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ******************************
 * Build inventory by classification view
 * ****************************** */
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

/* ******************************
 * Build a single view of an item when clicked a specific car
 * ****************************** */
invCont.buildItemView = async function (req, res, next) {
  try {
    const item_id = req.params.invId;
    if (!item_id) {
      return res.status(404).render("errors/error", {
        title: "400 - bad request",
        message: "invalid vehicle ID.",
        nav: await utilities.getNav(),
      });
    }
    const data = await invModel.getInventoryItemById(item_id);

    //verify if vehicle is found
    if (!data || data.length === 0) {
      return res.status(404).render("errors/error", {
        title: "404 - Not Found",
        message: "Sorry, the vehicle you are looking for cannot be found.",
        nav: await utilities.getNav(),
      });
    }

    const item = await utilities.buildItemView(data[0]);
    let nav = await utilities.getNav();
    res.render("./inventory/item", {
      title:
        data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model,
      nav,
      item,
    });
  } catch (error) {
    console.error("Error in buildItemView: " + error);
    next(error);
  }
};

module.exports = invCont;
