const exp = {};
const { categories } = require("../models/categories");
const logger = require("../adapters/logging")
exp.getCategories = function (req, res) {
  let category = new categories(req.query.id);
  if (category.ids.length){
    logger.info(`getting category ${req.query.id} with childrens`)
    return category.getChildrens().then((c) => {
      if (c.status === "success") return res.json(c);
      res.status(400).json(c);
    });
}

logger.info('getting all categories')
  category
      .populate()
      .then((c) => {
        res.json({ status: "success", data: c.items });
      })
      .catch((e) =>(logger.error(e), res.status(500).json({ status: "error", message: e })));
};

module.exports = exp;
