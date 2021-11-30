const express = require('express'); // create http server with express
require('express-group-routes');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./docs/initiation")
const specs = swaggerJsdoc(swaggerOptions);

const routes = require("./routes");

// express app
const app = express();
var port = process.env.PORT || 3000;

// api swagger api docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);


app.use(express.json()) // for parsing application/json
app.use(express.text()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// create apis
routes(app)

app.listen(port, () =>
  console.log(`serving at http://localhost:${port}`)
);