const faker = require('faker');
const { Client } = require('pg');
const fs = require('fs');
const exec = require('child_process').exec;
const pgtools = require('pgtools');
require('dotenv').config();

let config = {
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD
}


let dropDatabase = () => pgtools.dropdb(config, 'roomsDB');

let createDatabase = () => pgtools.createdb(config, 'roomsDB');

const createSchemaFactory = () => {
  const command = `psql roomsDB < database/schema.sql`;
  return new Promise(((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log('THIS IS ERROR', err);
      }
      resolve();
    });
  }));
};


let doEverything = async () => {
    await dropDatabase().catch(e => {
      console.log('...no existing database named \'roomsDB\' to delete... moving on');
    })
    await createDatabase();
    await createSchemaFactory();
}

doEverything();
