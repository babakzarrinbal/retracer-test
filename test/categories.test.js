const {categories} =  require("../models/categories");
const logger = require("../adapters/logging")
const fs = require("fs");
logger.info("removing previous mock database")
try{
  fs.unlinkSync(__dirname + '/database.sqlite');
  logger.success('mock database removed')
}catch(e){
  logger.info("no mock database exists")
}
fs.closeSync(fs.openSync(__dirname + '/database.sqlite', 'w'))
require('../adapters/database/seeder');

describe("testing category model", function () {
  it("should create model", (done) => {
    let category = new categories(25);
    if(category.ids.length) return done();
    done(new Error('couldn\'t create model'))
  })

  it("should get all categories",async()=>{
    let category = new categories();
    await category.populate();
    if(category.items.length) return ;
    return new Error('no id 1 in database ...')
  })

  it("should get category with id 1",async()=>{
    let category = new categories(1);
    await category.populate();
    if(category.items.length ===1) return ;
    return new Error('no id 1 in database ...')
  })

  it("should get category  id 1",async()=>{
    let category = new categories(1);
    await category.populate();
    if(category.items.length ===1) return ;
    return new Error('no id 1 in database ...')
  })
  
  it('should get category id 1 with children',async()=>{
    let category = new categories(1);
    let childs = await category.getChildrens();
    return !childs.data[0].every(c=>[1,2,3].includes(c.ID));
  })
})
