const faker = require('faker');
// const Room = require('./models/room.js');
const mongoose = require('mongoose');
// const fs = require('fs');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rooms');
const db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});


let idCounter = 1;
let finalArray;
const noDocsInSet = 1000;
let round = 1;

const randoGenArrayFactory = () => {
  finalArray = [];

  let i = 0;
  while (i < noDocsInSet) {
    const roomDetail = {
      id: idCounter,
      type: faker.random.arrayElement(
        ['House', 'Tiny House', 'Apartment', 'Private Room', 'Shared Room', 'RV'],
      ),
    };

    finalArray.push(roomDetail);
    idCounter++;
    i++;
  }
};


const insertionFactory = () => {
  randoGenArrayFactory();
  return new Promise(((resolve, reject) => {
    db.collection('rooms').insertMany(finalArray, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Insertion success - Round ${round}`);
        resolve();
      }
    });
  }));
};

const doEverything = async () => {
  const startTime = Date.now();
  while (round < 10001) {
    await insertionFactory();
    round++;
  }
  console.log(`\x1b[32m${(Date.now() - startTime) / 1000}s\x1b[0m`);
  await db.close();
};


doEverything();
