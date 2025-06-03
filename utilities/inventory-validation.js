const utilities = require("../utilities/");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.classificationRules = () => [
  body("classification_name")
    .trim()
    .notEmpty()
    .withMessage("Classification name is required.")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("No spaces or special characters allowed."),
];

validate.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req);
  let nav = await utilities.getNav();
  if (!errors.isEmpty()) {
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors,
    });
    return;
  }
  next();
};

module.exports = validate;
