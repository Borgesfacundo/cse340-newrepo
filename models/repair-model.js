const pool = require("../database/");

// Add a repair for an inventory car
async function addRepair(
  inv_id,
  repair_date,
  repair_description,
  repair_cost,
  repair_performed_by
) {
  const sql = `
        INSERT INTO repairs (inv_id, repair_date, repair_description, repair_cost, repair_performed_by)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;
  const result = await pool.query(sql, [
    inv_id,
    repair_date,
    repair_description,
    repair_cost,
    repair_performed_by,
  ]);
  return result.rows[0];
}

// Get repairs per vehicle
async function getRepairsByVehicle(inv_id) {
  const sql = `SELECT * FROM repairs WHERE inv_id = $1 ORDER BY repair_date DESC`;
  const result = await pool.query(sql, [inv_id]);
  return result.rows;
}

module.exports = { addRepair, getRepairsByVehicle };
