function insertInArray(arr, item, index) {
  return [...arr.slice(0, index), item, ...arr.slice(index)];
}

function factorial(num){
  return num===0?1:num * factorial( num - 1 );
}

module.exports = {
  factorial,
  insertInArray
}