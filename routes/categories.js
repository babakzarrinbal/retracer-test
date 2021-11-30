// @ts-ignore
const {getCategories} = require("../controllers")

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summery: get categories with children 
 *     parameters:
 *        in: query
 *        name: id
 *        schema:
 *          type: string
 *        description: id of category with sub categories to return
 *     responses:
 *       200:
 *         description: returns array of sorted objects
 */
var GetAllCategories = {
  path: "/categories",
  method:'get',
  middlewares:[],
  controller:getCategories
}


module.exports = [
  GetAllCategories
]