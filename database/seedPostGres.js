let { Client } = require('pg');
const fs = require('fs');
const exec = require('child_process').exec;
const pgtools = require('pgtools');
const seedUtilities = require('./seedUtilities');
const path = require('path');
const csv = require("fast-csv");
const {performance} = require('perf_hooks');
require('dotenv').config();


let endTime;
let noDocsInSet = 1000;
let excludeId = true;
let finalArray = seedUtilities.randoGenArrayFactory(noDocsInSet, excludeId);
let seedOutputPath = path.join(__dirname, 'seedFile', 'testSeed.csv');
let rounds = 10000;
let client;
let progressBarSize = 30;

let config = {
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
}

let dropDatabase = () => pgtools.dropdb(config, 'roomsDB');

let createDatabase = () => pgtools.createdb(config, 'roomsDB');

const loadSchemaFactory = () => {
  const command = `psql roomsDB < database/schema.sql`;
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log('...schema could not be loaded in the database', err);
        reject();
      }
      console.log('...schema loaded')
      resolve();
    });
  });
};

let csvTransformObject;

let writeTheThing = () => {

  let roomsDataStream = fs.createWriteStream(seedOutputPath);


  return new Promise ((resolve, reject) => {
    csv
    .writeToStream(roomsDataStream, finalArray, {
         headers: true,
         transform: function(row){
          csvTransformObject = {
            user: row.user,
            avatar: row.avatar,
            title: row.title,
            type: row. type,
            city: row.city,
            selfCheckin: row.selfCheckin,
            superhost: row.superhost,
            descriptions: JSON.stringify(row.descriptions),
            amenities: JSON.stringify(row.amenities),
            sleepingArrangements: JSON.stringify(row.sleepingArrangements),
          }
          return csvTransformObject;
         }
    })
    .on("finish", function(){
      console.log(`...wrote ${noDocsInSet} unique records to ${path.basename(seedOutputPath)}`);
      resolve();
    });
  });
}


let insertionFactory = async () => {
  client = new Client(config);
  client.connect();
  let headers = Object.keys(csvTransformObject);
  let caseSens = ["user", "sleepingArrangements", "selfCheckin"];
  headers.forEach((headersItem, headersIndex) => {
    caseSens.forEach(caseSensItem => {
      if(headersItem === caseSensItem){
        headers[headersIndex] = JSON.stringify(caseSensItem);
      }
    })
  })
  for(let i = 0; i < rounds; i++){
    await client.query(`COPY rooms(${headers}) FROM '${seedOutputPath}' WITH CSV HEADER`);
    let eachTick = Math.floor(rounds / progressBarSize);

    let progBar = [...Array(progressBarSize).keys()].fill(`\x1b[47m \x1b[0m`);
    let spacesToFill = Math.floor(i / eachTick);
    progBar = progBar.fill('\x1b[44m \x1b[0m', 0, spacesToFill);
    progBar = progBar.join('');
    seedUtilities.clearConsole();
    process.stdout.write(`${Math.round((i/rounds) * 100)}% complete... ${progBar}`);
  }
  seedUtilities.clearConsole();
  console.log(`...unique records inserted!`)
}

let deleteFile = () => {
  fs.unlink(seedOutputPath, err => {
    if(err) {
      console.log(err, '...could not delete file, see above')
    }
    console.log(`...${path.basename(seedOutputPath)} file deleted`);
  });
}

let doEverything = async () => {
    await dropDatabase().catch(e => {
      console.log('...no existing database named \'roomsDB\' to delete... moving on');
    })
    await createDatabase().then(() => {
      config.database = process.env.DATABASE
    });
    await loadSchemaFactory();
    let startTime = performance.now();
    await writeTheThing();
    console.log(`...importing unique data to postgres db ${rounds} times`)
    await insertionFactory();
    endTime = performance.now();
    console.log(`Time It Took: ${(((endTime - startTime)/1000)/60).toFixed(2)} minutes.`);
    deleteFile();
    await client.end();
}


doEverything();
