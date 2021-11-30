// @ts-ignore
const {getCategories} = require("../controllers")

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summery: get categories with children 
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