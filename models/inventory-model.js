const pool = require("../database/");

/* ***************************
 * Get all classification data
 * *************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

/* ***************************
 * Get all inventory items and classification_name by classification_id
 * *************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
            JOIN public.classification AS c
            ON i.classification_id = c.classification_id
            WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error ", error);
  }
}

/* ***************************
 * Get single car by classification_id, inv_model, and inv_year
 * *************************** */
async function getSingleCar(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
            WHERE inv_id = $1`,
      [inv_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getSingleCar error " + error);
  }
}

async function addClassification(classification_name) {
  try {
    const sql =
      "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *";
    const result = await pool.query(sql, [classification_name]);
    return result.rowCount;
  } catch (error) {
    throw error;
  }
}

/* *****************************
 * Add inventory function
 ******************************* */
async function addInventory(data) {
  try {
    const sql = `
    INSERT INTO public.inventory (
    classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    const params = [
      data.classification_id,
      data.inv_make,
      data.inv_model,
      data.inv_year,
      data.inv_description,
      data.inv_image,
      data.inv_thumbnail,
      data.inv_price,
      data.inv_miles,
      data.inv_color,
    ];
    const result = await pool.query(sql, params);
    return result.rowCount;
  } catch (error) {
    throw error;
  }
}

/* *****************************
 * Edit inventory function
 ******************************* */
async function updateInventory(
  inv_id,
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql = `
    UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *`;
    const data = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
      inv_id,
    ]);
    return data.rows[0];
  } catch (error) {
    console.error("model error; " + error);
  }
}

/* *****************************
 * Delete inventory function
 ******************************* */
async function deleteInventory(inv_id) {
  try {
    const sql = `
    DELETE FROM inventory WHERE inv_id = $1`;
    const data = await pool.query(sql, [inv_id]);
    return data.rowCount;
  } catch (error) {
    new Error("Delete Inventory Error");
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getSingleCar,
  addClassification,
  addInventory,
  updateInventory,
  deleteInventory,
};
