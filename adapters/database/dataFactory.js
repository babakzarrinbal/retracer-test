const { DB } = require("./dbconnection");
const logger = require("../logging");
/**
 *
 * @param {string} table table/document name to query
 * @param {{field:string,operator:string,value:string}[]} conditions conditions to apply to query
 * @param {string[]} project list of columns/fields to be shown
 * @param {Number} limit limits query result
 * @param {Number} offset offset of starting rows to return
 */
async function get(
  table,
  conditions = [],
  project = [],
  limit = 0,
  offset = 0
) {
  let query = `SELECT ${project.join(", ") || "*"} FROM ${table}`;
  if (conditions.length)
    query += ` WHERE ${conditions
      .map((c) => `${c.field} ${c.operator} ${c.value}`)
      .join(" AND ")}`;
  if (limit) query += ` LIMIT ${limit}`;
  if (offset) query += ` OFFSET ${offset}`;
  let result = { status: "success" };
  try {
    result.data = await DB.query(query);
  } catch (e) {
    logger.error(e);
    result.message = e;
    result.status = "error";
  }
  return result;
}

/**
 *
 * @param {string} table  name of table/document
 * @param {string|string[]} ids id of the given record
 * @param {string[]} project array of fields name to return
 */
async function getById(table, ids, project = []) {
  let query = `SELECT ${project.join(", ") || "*"} FROM ${table} WHERE id in(${
    Array.isArray(ids) ? ids.join(", ") : ids
  })`;
  let result = { status: "success" };
  try {
    result.data = await DB.query(query);
  } catch (e) {
    logger.error(e);
    result.message = e;
    result.status = "error";
  }
  return result;
}

/**
 *
 * @param {string|number} id id of the given record
 * @param {string[]} project array of fields name to return
 */
async function getCategoryWithSubCategories(id, project = []) {

  let query = `WITH RECURSIVE
  getCatWithSubCats(n) AS (
    VALUES(${id})
    UNION
    SELECT ID FROM CATEGORIES, getCatWithSubCats
     WHERE CATEGORIES.PARENT_ID=getCatWithSubCats.n
  )
  SELECT ${project.join(", ") || "*"} FROM CATEGORIES
  WHERE CATEGORIES.ID IN getCatWithSubCats;`;

  let result = { status: "success" };
  try {
    result.data = await DB.query(query);
  } catch (e) {
    logger.error(e);
    result.message = e;
    result.status = "error";
  }
  return result;
}

module.exports = {
  get,
  getById,
  getCategoryWithSubCategories,
};
