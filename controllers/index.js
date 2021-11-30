const fs = require('fs');
var controllers = {};
const filenames = fs.readdirSync(__dirname);
for(let filename of filenames.filter(f=>f!="index.js")){
  let controller = require("./"+filename);
  controllers = {...controllers,...controller}
}
module.exports =controllers;