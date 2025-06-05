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
    errors: null,
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

/* **************************************
 * Build view to add classification or vehicle
 * *********************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList();
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    classificationList,
  });
};

// Show the form to add a new classification
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  });
};

//Process the form to add a new classification
invCont.processAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;
  try {
    const result = await invModel.addClassification(classification_name);
    if (result) {
      req.flash("notice", "The new car classification was successfully added.");
      res.redirect("/inv");
    } else {
      req.flash("notice", "failed to add classification.");
      res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null,
      });
    }
  } catch (error) {
    req.flash("notice", "Error adding classification.");
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    });
  }
};

// Show the form to add a new vehicle
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null,
  });
};

// Process the form to add a new vehicle
invCont.processAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList(
    req.body.classification_id
  );
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  } = req.body;
  try {
    const result = await invModel.addInventory({
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
    if (result) {
      req.flash("notice", "The new vehicle was successfully added.");
      res.redirect("/inv");
    } else {
      req.flash("notice", "Failed to add inventory item.");
      res.render("inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        classificationList,
        errors: null,
      });
    }
  } catch (error) {
    req.flash("notice", "Error adding inventory item.");
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: null,
    });
  }
};

/* **************************************
 * Return Inventory by Classification As JSON
 * *********************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id);
  const invData = await invModel.getInventoryByClassificationId(
    classification_id
  );
  if (invData[0].inv_id) {
    return res.json(invData);
  } else {
    next(new Error("No data returned"));
  }
};

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.buildEditInventory = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id);
  let nav = await utilities.getNav();
  const data = await invModel.getSingleCar(inv_id);
  const itemData = data[0];
  if (!itemData) {
    req.flash("notice", "Vehicle not found.");
    return res.redirect("/inv");
  }
  const classificationList = await utilities.buildClassificationList(
    itemData.classification_id
  );
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`;
  res.render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationList,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id,
  });
};

module.exports = invCont;
