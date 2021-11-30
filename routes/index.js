const fs = require("fs");
const routes = [];

// reading all route files
const filenames = fs.readdirSync(__dirname);
for (let filename of filenames.filter((f) => f != "index.js")) {
  let route = require("./" + filename);
  routes.push(...route);
}

// creating routes on express based on route files
module.exports = function (app) {
  app.group("/api", (router) => {
    for (let route of routes) {
      switch (route.method.toUpperCase()) {
        case "GET":
          router.get(route.path, route.controller);
        case "POST":
          router.post(route.path, route.controller);
        case "PATCH":
          router.post(route.path, route.controller);
        case "DELETE":
          router.post(route.path, route.controller);
      }
    }
  });
};
