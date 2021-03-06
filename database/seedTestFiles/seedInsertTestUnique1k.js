const faker = require('faker');
const mongoose = require('mongoose');
const Room = require('../models/roomTest.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rooms');
const db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});


let idCounter = 1;
const finalArray = [];
let insertedArray;
const noDocsInSet = 1000;
let round = 1;

const randoGenArrayFactory = () => {
  let i = 0;
  while (i < noDocsInSet) {
    const roomDetail = {
      id: idCounter,
      user: faker.name.findName(),
      avatar: faker.random.arrayElement(
        ['https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person1.jpg', 'https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person2.jpg', 'https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person3.jpg'],
      ),
      title: faker.lorem.word(),
      type: faker.random.arrayElement(
        ['House', 'Tiny House', 'Apartment', 'Private Room', 'Shared Room', 'RV'],
      ),
      city: faker.address.city(),
    };

    finalArray.push(roomDetail);
    i++;
  }
};


const parseFactory = () => new Promise(((resolve, reject) => {
  let i = 0;
  insertedArray = JSON.parse(JSON.stringify(finalArray.slice()));
  while (i < noDocsInSet) {
    insertedArray[i].id = idCounter++;
    i++;
  }
  resolve();
}));
const insertionFactory = () => new Promise(((resolve, reject) => {
  // Room.RoomModel.insertMany(insertedArray, function(error){
  db.collection('rooms').insertMany(insertedArray, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Insertion success - Round ${round}`);
      resolve();
    }
  });
}));

const doEverything = async () => {
  const startTime = Date.now();
  randoGenArrayFactory();
  while (round < 10001) {
    await parseFactory();
    await insertionFactory();
    round++;
  }
  console.log(`\x1b[32m${(Date.now() - startTime) / 1000}s\x1b[0m`);
  await db.close();
};


doEverything();
