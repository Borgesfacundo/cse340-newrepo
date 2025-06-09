const repairModel = require("../models/repair-model");
const utilities = require("../utilities/");

// Show the vehicle's repairs history
async function showRepairs(req, res) {
  const inv_id = req.params.inv_id;
  const repairs = await repairModel.getRepairsByVehicle(inv_id);
  let nav = await utilities.getNav();
  res.render("inventory/repairs", {
    title: "Vehicle Repairs",
    nav,
    repairs,
    inv_id,
  });
}

// Add a repair for a vehicle
async function addRepair(req, res) {
  const {
    inv_id,
    repair_date,
    repair_description,
    repair_cost,
    repair_performed_by,
  } = req.body;
  await repairModel.addRepair(
    inv_id,
    repair_date,
    repair_description,
    repair_cost,
    repair_performed_by
  );
  res.redirect(`/inventory/repairs/${inv_id}`);
}

module.exports = { showRepairs, addRepair };
