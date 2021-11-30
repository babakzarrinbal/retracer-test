const fs = require('fs');
if(!fs.existsSync(__dirname + '/database.sqlite')){
  fs.closeSync(fs.openSync(__dirname + '/database.sqlite', 'w'))
  require('./seeder');
}
const { DB } = require("./dbconnection.js");
const logger = require("../logging");

async function createTables() {
  let categoryTable = `CREATE TABLE IF NOT EXISTS CATEGORIES (
    ID integer PRIMARY KEY AUTOINCREMENT,
    NAME varchar(64) NOT NULL,
    PARENT_ID integer,
    FOREIGN KEY(PARENT_ID) REFERENCES CATEGORIES(ID)
  )`;

  try {
    await DB.query(categoryTable);
  } catch (e) {
    logger.error(e);
  }
}

async function populateCategories() {
  let categories = [
    "INSERT INTO CATEGORIES (NAME,PARENT_ID) VALUES ('Category1',null)",
    "insert into CATEGORIES (NAME,PARENT_ID) VALUES ('Subcategories',1)",
    "insert into CATEGORIES (NAME,PARENT_ID) VALUES ('Subcategories',2)",
    "insert into CATEGORIES (NAME,PARENT_ID) VALUES ('Subcategories',1)",
    "INSERT INTO CATEGORIES (NAME,PARENT_ID) VALUES ('Category2',null)",
    "insert into CATEGORIES (NAME,PARENT_ID) VALUES ('Subcategories2', (SELECT ID FROM CATEGORIES WHERE NAME='Category2'))",
    "INSERT INTO CATEGORIES (NAME,PARENT_ID) VALUES ('Category3',null)",
    "insert into CATEGORIES (NAME,PARENT_ID) VALUES ('Subcategories3', (SELECT ID FROM CATEGORIES WHERE NAME='Category3'))",
    "insert into CATEGORIES (NAME,PARENT_ID) VALUES ('Subcategories33', (SELECT ID FROM CATEGORIES WHERE NAME='Subcategories3'))",
  ];

  for (let category of categories) {
    try {
      await DB.query(category);
    } catch (e) {
      logger.error(e);
    }
  }
}

async function droptable(){
  try{
    DB.query('DROP Table IF EXISTS CATEGORIES');
  }catch(e){
    logger.error(e);
  }
}

(async function(){
  await createTables();
  await populateCategories();
  // await droptable();
})()