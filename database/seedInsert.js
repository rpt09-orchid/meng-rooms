const mongoose = require('mongoose');
const seedUtilities = require('./seedUtilities');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rooms');
let db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});

var finalArray;
var insertedArray;
var noDocsInSet = 2;
var round = 1;
let idCounter = 1;

let parseFactory = () => {
  return new Promise(function(resolve, reject){
    let i = 0;
    insertedArray = JSON.parse(JSON.stringify(finalArray.slice()));
    while ( i < noDocsInSet){
      insertedArray[i].id = idCounter++;
      i++;
    }
    resolve();
  })
}
let insertionFactory = () => {
  return new Promise(function(resolve, reject){
    db.collection('rooms').insertMany(insertedArray, function(error, doc) {
      if(error) {
        console.log(error);
      } else {
        console.log(`Insertion success - Round ${round}`);
        resolve()
      }
    });
  })
}

let doEverything= async () => {
  let startTime = Date.now();
  finalArray = seedUtilities.randoGenArrayFactory(noDocsInSet);
  while(round < 10001){
    await parseFactory();
    await insertionFactory();
    round++;
  }
  console.log(`\x1b[32m${(Date.now() - startTime) / 1000}s\x1b[0m`);
  await db.close()
}


doEverything();
