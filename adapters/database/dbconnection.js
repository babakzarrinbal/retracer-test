const { Sequelize } = require("sequelize");
// const DB = new Sequelize("sqlite::memory:");
const logger = require("../logging");
const fs = require('fs');


const DB = new Sequelize({
  dialect: "sqlite",
  storage:
    process.env.NODE_ENV === "test" ? "./test/database.sqlite" : __dirname + "/database.sqlite",
  logging: false,
});

const connectionCheck = async function connectionCheck() {
  try {
    await DB.authenticate();
    logger.success("Connection has been established successfully.");
    return true;
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    return false;
  }
};

module.exports = {
  DB,
  connectionCheck,
};

if(!fs.existsSync("__dirname + '/database.sqlite'")){
  require('./seeder');
}