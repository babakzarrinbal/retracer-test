const { model } = require("../interfaces/model");
const {
  getCategoryWithSubCategories,
} = require("../adapters/database/dataFactory");

class categories extends model {
  constructor(identifiers) {
    super();
    this.ids = [];
    this.items = [];
    if (!identifiers) return;
    this.ids = Array.isArray(identifiers) ? [...identifiers] : [identifiers];
  }

  async populate(identifiers) {
    if (identifiers)
      this.ids = Array.isArray(identifiers) ? [...identifiers] : [identifiers];
    let results = this.ids.length
      ? await this.getById("CATEGORIES", this.ids)
      : await this.get("CATEGORIES");
    
    if (results.status !== "error") this.items = results.data;
    return this;
  }

   getChildrens() {
    return Promise.all(this.ids.map(id=>getCategoryWithSubCategories(id)))
      .then((result) => ({
        status: "success",
        data: result.map((r) => r.data[0]),
      }))
      .catch((r) => ({
        status: "error",
        message: r.toString(),
      }));
  };
}

module.exports = {
  categories,
};
