const {getCategoryWithSubCategories}=  require("../adapters/database/dataFactory");

(async function(){
  let data = await getCategoryWithSubCategories(1);
  console.log(data);
})()