const faker = require('faker');
const mongoose = require('mongoose');
const fs = require('fs');
const exec = require('child_process').exec;
let startTime;
let importStartTime;

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
let seedOutputPath = `${__dirname}/../seedFile/testSeed.json`;
var finalArray = [];

while ( idCounter < uniqueRecords ){

  let roomDetail = {
    id: idCounter,
    type: faker.random.arrayElement(
      ['House', 'Tiny House', 'Apartment', 'Private Room', 'Shared Room', 'RV']
    ),
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
    resolve();
  });
})}

let writeComma = () => {
  return new Promise(function(resolve, reject){
  fs.appendFile(outputLoc, ',',(err) => {
    if (err) throw err;
    resolve();
  });
})};

let writeContent = (round) =>{
  return new Promise (function(resolve, reject) {

    if(round !== 1){
      for(let i = 0; i < uniqueRecords - 1; i++){
        let currRecord = JSON.parse(finalArray[i]);
        currRecord.id = idCounter;
        finalArray[i] = JSON.stringify(currRecord);
        idCounter++;
      }
    }

    fs.appendFile(outputLoc, finalArray,(err) => {
      if (err) throw err;
      resolve();
    });
})};

let writeContents = async () => {
  for (let round = 1; round < 10001; round++) {
    round !==1 && await writeComma();
    await writeContent(round);
    console.log(round);
  }
}

let writeCloseBracket = () => {
  return new Promise(function(resolve, reject){
  fs.appendFile(outputLoc, ']',(err) => {
    if (err) throw err;
    resolve();
  });
})};

let importFactory = () => {

  let command = `mongoimport --db rooms --collection rooms --type json --file ${seedOutputPath} --jsonArray --numInsertionWorkers 2`;
  console.log(`Time to Generate + Export: \x1b[32m${(Date.now() - startTime) / 1000}s\x1b[0m`);
  console.log('starting to import');
  importStartTime = Date.now();
  return new Promise(function(resolve, reject) {
    exec(command, (err, stdout, stderr) => {
      if(err) {
        console.log('THIS IS ERROR', err);
      }
      console.log(`Time to Import: \x1b[32m${(Date.now() - importStartTime) / 1000}s\x1b[0m`);
      resolve();
    })
  })
}

let deleteFile = () => {
  return new Promise (function(resolve, reject) {
    fs.unlink(seedOutputPath, (err) => {
      if (err) throw err;
      console.log(`${seedOutputPath} was deleted`);
      resolve();
    });
  })

}

let writeEverything = async () => {
  startTime = Date.now();
  await writeOpenBracket();
  await writeContents();
  await writeCloseBracket();
  await importFactory();
  await deleteFile();
  await db.close();
}

writeEverything();

