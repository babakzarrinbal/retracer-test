### Boarding ticket 
  simple api endpoint to get the array of json with mandatory "to" and "from" fields and returns the sorted array of items where each to is before same from ...

  
## sorting
  sorts boarding ticket based on from, to fields
  

## initialization
  clone the repository
  cd root path
  run $npm i 
  run $npm start
  localhost:3000/api-docs => for docs on apis

## testing
  run $npm run test


## dev info
  route folder is scanned dynamically for specified route json so just add file and routes inside
  controller folder is also scanned dynamically for contorller methods

  for api docs i'm using swagger api and js docs
  for testing mocha is used but you can use chai , senion , faker also 

  sorting is done via bellow algorithm
  1- loopthough all tickets and if can be sorted will be injected to temprory sorting array
  2- loop through unsorted items to put them in sorting array
  