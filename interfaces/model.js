const { get, getById } = require("../adapters/database/dataFactory");
class model {
  get(...args) {
    return get(...args);
  }
  getById(...args) {
    return getById(...args);
  }
}

module.exports = {
  model,
};
