const exp = {};
const { categories } = require("../models/categories");
const logger = require("../adapters/logging")
exp.getCategories = function (req, res) {
  let category = new categories(req.query.id);
  if (category.ids.length)
    return category.getChildrens().then((c) => {
      if (c.status === "success") return res.json(c);
      res.status(400).json(c);
    });

  category
      .populate()
      .then((c) => {
        res.json({ status: "success", data: c.items });
      })
      .catch((e) =>(logger.error(e), res.status(500).json({ status: "error", message: e })));
};

module.exports = exp;
