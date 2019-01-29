const faker = require('faker');
// const Room = require('./models/room.js');
const mongoose = require('mongoose');
// const fs = require('fs');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rooms');
let db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});


var idCounter = 1;
var finalArray;
var noDocsInSet = 1000;
var round = 1;

var randoGenArrayFactory = () => {
  finalArray = [];

  let i = 0;
  while ( i < noDocsInSet){

    let roomDetail = {
      id: idCounter,
      type: faker.random.arrayElement(
        ['House', 'Tiny House', 'Apartment', 'Private Room', 'Shared Room', 'RV']
      ),
    };

    finalArray.push(roomDetail);
    idCounter++;
    i++;
  }
}


let insertionFactory = () => {
  randoGenArrayFactory();
  return new Promise(function(resolve, reject){
    db.collection('rooms').insertMany( finalArray, function(error) {
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
  while(round < 10001){
    await insertionFactory();
    round++;
  }
  console.log(`\x1b[32m${(Date.now() - startTime) / 1000}s\x1b[0m`);
  await db.close()
}


doEverything();




