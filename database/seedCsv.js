const faker = require('faker');
const Room = require('./models/room.js');
const mongoose = require('mongoose');
const fs = require('fs');
let converter = require('json-2-csv');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rooms');
let db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});


let uniqueRecords = 1001;
let idCounter = 1;

var finalArray = [];

while ( idCounter < uniqueRecords ){

  let fakeDescriptions = [
    {
      title: 'headline',
      text: faker.lorem.paragraph()
    },
    {
      title: 'The space',
      text: faker.lorem.paragraph()
    },
    {
      title: 'Guest Access',
      text: faker.lorem.paragraph()
    },
    {
      title: 'Interaction with guests',
      text: faker.lorem.paragraph()
    },
    {
      title: 'Other things to note',
      text: faker.lorem.paragraph()
    }
  ];

  let fakeSleeping = [
    {
      typeOfRoom: 'Bedroom',
      furniture: faker.random.arrayElement([
        {
          typeOfFurniture: 'queen bed',
          qty: faker.random.number({min: 1, max: 2})
        },
        {
          typeOfFurniture: 'double bed',
          qty: faker.random.number({min: 1, max: 2})
        },
        {
          typeOfFurniture: 'single bed',
          qty: faker.random.number({min: 1, max: 3})
        }
      ])
    }
  ];

  let roomDetail = {
    id: idCounter,
    user: faker.name.findName(),
    avatar: faker.random.arrayElement(
      ['https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person1.jpg','https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person2.jpg', 'https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person3.jpg']
    ),
    title: faker.lorem.word(),
    type: faker.random.arrayElement(
      ['House', 'Tiny House', 'Apartment', 'Private Room', 'Shared Room', 'RV']
    ),
    city: faker.address.city(),
    selfCheckin: faker.random.boolean(),
    superhost: faker.random.boolean(),
    descriptions: fakeDescriptions,
    amenities: ['Kitchen', 'Iron', 'Free parking on premises', 'Wifi', 'Hangers', 'Laptop friendly workspace'],
    sleepingArrangements: fakeSleeping
  };

  var stringRoomDetail = JSON.stringify(roomDetail);
  finalArray.push(stringRoomDetail);

  idCounter++;
}


let outputLoc = 'database/seedFile/testSeed.json';

let writeOpenBracket = () => {
  return new Promise(function(resolve, reject){
  fs.writeFile(outputLoc, '[',(err) => {
    if (err) throw err;
    console.log('Open bracket has been saved!');
    resolve();
  });
})}

let writeComma = () => {
  return new Promise(function(resolve, reject){
  fs.appendFile(outputLoc, ',',(err) => {
    if (err) throw err;
    console.log('Comma has been saved!');
    resolve();
  });
})};

let writeContent = (round) =>{
  return new Promise (function(resolve, reject) {

    // if(round !== 1){
    //   for(let i = 0; i < uniqueRecords - 1; i++){
    //     let currRecord = JSON.parse(finalArray[i]);
    //     currRecord.id = idCounter;
    //     finalArray[i] = JSON.stringify(currRecord);
    //     idCounter++;
    //   }
    // }
    let json2csvCallback = function (err, csv) {
      if (err) throw err;
      console.log(csv);
    };

    converter.json2csv(documents, json2csvCallback);

    fs.appendFile(outputLoc, finalArray,(err) => {
      if (err) throw err;
      console.log('Contents have been saved!');
      resolve();
    });
})};

let writeContents = async () => {
  for (let round = 1; round < 3; round++) {
    round !==1 && await writeComma();
    await writeContent(round);
    console.log(round);
  }
}

let writeCloseBracket = () => {
  return new Promise(function(resolve, reject){
  fs.appendFile(outputLoc, ']',(err) => {
    if (err) throw err;
    console.log('Closed bracket has been saved!');
    resolve();
  });
})};

let writeEverything = async () => {
  // await writeOpenBracket();
  await writeContents();
  // await writeCloseBracket();
}

writeEverything();
