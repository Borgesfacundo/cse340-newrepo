const { body, validationResult } = require("express-validator");
const utilities = require("../utilities/");
const repairModel = require("../models/repair-model");
const repairValidate = {};

//Rules for the validation to add repair
repairValidate.repairRules = () => [
  body("inv_id").notEmpty().withMessage("Inventory ID is required."),
  body("repair_date").isISO8601().withMessage("Valid date is required."),
  body("repair_description")
    .trim()
    .notEmpty()
    .withMessage("Repair description is required."),
  body("repair_cost")
    .isFloat({ min: 0 })
    .withMessage("Repair cost must be a positive number."),
  body("repair_performed_by")
    .trim()
    .notEmpty()
    .withMessage("Repair performed by is required."),
];

// Middleware to check the repair data
repairValidate.checkRepairData = async (req, res, next) => {
  const errors = validationResult(req);
  let nav = await utilities.getNav();
  const repairs = await repairModel.getRepairsByVehicle(req.body.inv_id);
  if (!errors.isEmpty()) {
    res.render("inventory/repairs", {
      title: "Vehicle Repairs",
      nav,
      repairs,
      inv_id: req.body.inv_id,
      errors,
      ...req.body, // to retain form data
    });
    return;
  }
  next();
};

module.exports = repairValidate;
