# Systems Design Project for Rooms Service

<<<<<<< HEAD
The goal of this project is to take the legacy project [`Rooms Service`]((https://github.com/rpt09-mulder/rooms)) and optimize back-end database and querying performance.
=======
The focus of this project is to take the legacy project [`Rooms Service`]((https://github.com/rpt09-mulder/rooms)) and optimize back-end database and querying performance.
>>>>>>> master

## Table Of Contents:
+ [Related Projects](#Related-Projects)
+ [Requirements](#Requirements)
+ [Installation](#Installation)
+ [Goal 1 - Generate 10 Million Records](#Goal-1---Generate-10-Million-Records)
+ [Backlog / Noted Opportunities](#Backlog-/-Noted-Opportunities)

## Related Projects
- [Rooms (FEC)](https://github.com/rpt09-mulder/rooms)

## Requirements

- Node v10.12.0
- MongoDB v4.0.3
- NPM v6.5.0

<<<<<<< HEAD
## Set Up
After cloning the project, go to the root directory then install all required dependencies by running
```sh
npm install
```
Build the webpack bundle by running

```sh
npm run react-dev
```

Wait for the build to complete then start the server by running

```sh
npm run server-dev
```
and finally, on your browser go to http://localhost:3001

## Database Installation:

### For Mongo

If you haven't already, start your MongoDB service then seed the database with 100 records by running

```sh
npm run seed-database
```

[Optional] If you would like to seed 10 million records in **mongo** instead, you may do so by running
```sh
npm run seed-large-database-mongo
```

### For PostgreSQL (**Preferred**)

In terminal:
1. Install PostgreSQL:`brew install postgresql` (this example uses PostgreSQL version 10.5) (to explore other non-brew options too install PostgreSQL, click [here](https://www.postgresql.org/download/macosx/) for Mac options and click [here](https://www.postgresql.org/download/windows/) for Windows options)
2. Start PostgresSQL:`brew services start postgresql`
3. Create `roomsDB`: `createdb roomsDB`

#### Of Note:
+ To enter PostgreSQL cli (db name is `roomsDB`): <pre>psql <i>dbNameHere</i></pre>
+ To view all current psql databases in terminal: `psql -l`
+ To view all tables in PostgreSQL cli: `\dt`
+ To describe table in PostgreSQL cli (table name is `rooms`):
<pre>
\d+ <i>tableNameHere</i>
</pre>
+ To view all databases in PostgreSQL cli: `\l`
+ To exit out of PostgreSQL cli: `\q`
+ If neccessary, to grant a specific user permissions to the table, log into psql as a super user and in the PostgreSQL cli (table name is `rooms`):
<pre>
GRANT ALL PRIVILEGES ON TABLE <i>tableNameHere</i> TO <i>userNameHere</i>
GRANT USAGE ON SCHEMA public TO <i>userNameHere</i>
</pre>
+ `Schema` in mysql vs `Schema` in PostgreSQL can mean different things

### Set Up Environment Variables
1. Create a `.env` file to set up your variables: `cp .env-sample .env`
2. Open the `.env` file and fill in the `HOST`, `DBUSERNAME`, `DBPASSWORD` and `DBPORT` (database server port) fields (default `DBPORT` is `5432`)

### Seed PostgreSQL Database
To see 10 million records - in terminal, run `npm run seed-large-database`.

## Log

###  Goal 1 - Generate 10 Million Records in Legacy Database
=======
## Installation

After cloning the project, go to the root directory then install all required dependencies by running

```sh
npm install
```

If you haven't already, start your MongoDB service then seed the database with 100 records by running

```sh
npm run seed-database
```

[Optional] If you would like to seed 10 million records instead of 100 records, you may do so by running
```sh
npm run seed-large-database
```

Build the webpack bundle by running

```sh
npm run react-dev
```

Wait for the build to complete then start the server by running

```sh
npm run server-dev
```

and finally, on your browser go to http://localhost:3001

## Log

###  Goal 1 - Generate 10 Million Records
>>>>>>> master

Of note, for this goal - I wanted a minimum of 1000 records to be unique.

Reviewing the legacy code, I noticed:
+ Currently, the seed script is only generating only 100 unique records.
+ There are a couple of documents that have embedded sub documents (nested arrays).  My strategy is to change as little legacy code as possible.
+ If I were to generate 1000 unique records and then duplicate those unique records 10,000 times, the tradeoff is - I would have to parse the existing unique `id` field starting at `id: 1001` / onwards and inject sequential numbers (so the `id` field can maintain it's uniqueness).

What I Did / Learned:
+ Tried using the `createcsvwriter` npm package, but realized mongoimport cannot create a nested array upon import.  On a fun note, you can import nested objects upon import with a .csv file (just make sure the csv headers are titled correctly with dot notation).  At this point, exporting / importing a .csv file is off the table.
+ Used fs module (writeFile and appendFile functions) to write to an external json file where nested arrays can be maintained.  Noticed that writefile will not write my final array / include the initial open / close brackets - had to manually write that in (using promises).
+ Exporting 10,000,000 records into .json yielded a 15gb file.
+ **At the end, my selected solution, was using the [`insertMany`](/Users/mengsung/Desktop/HackReactor/rpt09-sdc/meng-rooms/database/seedInsert.js) strategy as oppossed to the [json import](database/seedJson.js) strategy.  The `insertMany` strategy did not yield a 15gb file and was a little bit faster than the json import strategy.**
<br/>
<br/>
<img hspace = "13px" src="readme-assets/10milInsert.gif" width="375">
<br/>


<<<<<<< HEAD
### Testing Matrix
=======
#### Testing Matrix
>>>>>>> master
Please note, results seen in the same table were experiments done on the same day.  For abbreviated terms, see the [Glossary](#Glossary).

### Insert Many, Using Mongo Driver Insertion ([seedInsertTestUnique10mil.js](database/seedTestFiles/seedInsertTestUnique10mil.js)), [seedInsertTestUnique1k.js](database/seedTestFiles/seedInsertTestUnique1k.js))

|                     	| Batched (1000)               | Batched (10,000)      	      |
| ---------------------	| ---------------------------- | ---------------------------	|
| Unique (10,000,000) 	| **2:49m (1ff), 13.6 (5ff)**  | **2.42m (1ff), 10.49m (5ff)**|
| Unique (1,000)      	| **2.56m (1ff), 4.15m (5ff)** | **2.59m (1ff), 4.12m (5ff)** |

+ For the actual amount of fields, it took **19.35m** (batched 1000, unique 1000, using Mongo Driver insertion).
+ **Conclusion**: For 5ff, batching didn't seem to matter - however, you definitely want to try to decrease your unique values.
<br/><br/>

### InsertMany ([seedInsertTestUnique1k.js](database/seedTestFiles/seedInsertTestUnique1k.js))
|                     	| Mongo Driver (Batched 1000)| Mongoose (Batched 1000)  |
| ---------------------	| -------------------------- | -------------------------|
| Unique (1,000)      	|           **5.29m**        |          **24.8m**       |
+ **Conclusion**:
Definitely worthwhile to utilize the Mongo Driver `insertMany` method vs validating the insertion with a mongo model (i.e. the `Mongoose` method).
<br/><br/>

### Write to File w. Parsed Ids ([seedJsonTest.js](database/seedTestFiles/seedJsonTest.js), [seedJsonStreamTest.js](database/seedTestFiles/seedJsonStreamTest.js))

|                     	| appendFile w. Parsed Ids / MongoImport(JSON)           | createWriteStream w. Parsed Ids / MongoImport(JSON)         	  |
| ---------------------	| ------------------------------------------------------ | -------------------------------------------------------- |
| Unique (1,000)      	| **2.01m** = 0.7m + 1.31m (1ff), **3.95m** = 1.45m + 2.50m (5ff)| **2.07m** = 0.75m + 1.32m (1ff), **3.66 m** = 2.32m + 1.34m (5ff)|

+ For the actual amount of fields, using `appendFile`, it took a total of **21.65m** (7.46m to generate + write, 14.19m to import).
+ For the actual amount of fields, using `fs.createWriteStream`, it took a total of **20.32m** (7.8m to generate + write, 12.52m to import).
+ **Conclusion**:
Using a stream to write to a file (`fs.createWriteStream`), offered no significant increase in speed.

<br/>
Other testing factors to try in the future:

+ Adding ids only in Mongo
+ Adding ids in the .json file

<<<<<<< HEAD


###  Goal 2 - Generate 10 Million Records in PostGres Database and create api call

Of note, for this goal - I wanted a minimum of 1000 records to be unique.  I wanted to change as little existing code as possible.

What I used: I used a npm package title `fast-csv` which wrote my array of unique records into a .csv file.  It was tricky because, again, the data shape for this service included nested arrays / objects.  To help with this, I had to use the `transform` function of `fast-csv` to stringify the nested arrays in lieu of `[Object]` written into the .csv.

It took 10.78 minutes to generate my postgres database.
![2019-02-01_17-41-49](https://user-images.githubusercontent.com/7980628/52158023-e4d25080-2648-11e9-99eb-f0a7f1e0da48.png)




System Design:
Because I wanted to change as little code as possible, I still had to flush out the new api for the postgres database - happy to report - you only need to touch one line of code to convert the legacy mongo connection to post gres (used similar naming schemes for postgres).  This is true if you would like to change back to mongodb from postgres.

What I learned:


What I appreciated:
+ Postgres supports JSON objects - and so even though I had the nested arrays, when I queried the postgres database, I recieved the unparsed object.  I did not have to modify the API what so ever.

Features:
+ Created a dynamic progress bar when the imports were happening in the postgres database.

![2019-02-01_17-41-06](https://user-images.githubusercontent.com/7980628/52158024-e865d780-2648-11e9-90d8-ceca569e9fd3.png)

### Goal 3 Compare PostGres and Mongo Query Results:

PostgreSQL Results
![PostGres Query Results](https://user-images.githubusercontent.com/7980628/52160768-ff6bf000-266f-11e9-932e-b19ae10151e9.png)

Mongo Results
![Mongo Results](https://user-images.githubusercontent.com/7980628/52160797-5b367900-2670-11e9-8560-3a3b010b8411.png)

I learned that when you have a model in mongoose where unique is set - an index is automatically created for you.

Conclusion: Postgres is way faster

=======
>>>>>>> master
## Glossary
+ **5 ff (5 faker fields)**
```javascript
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
      city: faker.address.city()
    };
```

+ **1 ff (1 faker field)**
```javascript
    let roomDetail = {
      id: idCounter,
      type: faker.random.arrayElement(
        ['House', 'Tiny House', 'Apartment', 'Private Room', 'Shared Room', 'RV']
      ),
    };
```

+ **Mongo Driver**

When I used the `Mongo Driver`, I did not validate the data with a model during my insertion.  In other words, during the `insertMany` function, I used the following syntax: `db.collection('rooms').insertMany(insertedArray, function(error) {...})`.  Using this syntax allows mongoose to interact with the mongo driver directly.

+ **Mongoose**

When I used the `Mongoose`, I validated the data with a model during my insertion.  In other words, during the `insertMany` function, I used the following syntax: `Room.RoomModel.insertMany(insertedArray, function(error) {...})`.


## Backlog / Noted Opportunities
<<<<<<< HEAD
+ Condense / modularize portions of the various seed scripts provided as there are some repititive parts.


Of Note:

The jest tests were not passing from the legacy code this is because the RoomModel object should have been added to the `room.js` export.  When that was added, the jest tests broke.  The jest tests broke because it is trying to mock RoomModel.  I had to figure out a way for the jest.mock to disregard the RoomModel when attempting a mock - this is because the RoomModel is never used in the original jesttests.

```
function mockFunctions() {
  return {findByID: jest.fn()}
}
jest.mock('../database/models/room.js', () => mockFunctions());
const storage = require.requireMock('../database/models/room.js');
```

and to call the test, we would execute something like:
```
  storage.findByID.mockImplementation((id, cb) => {
    cb(null, [{ id: 'this is a test' }]);
  });
```
=======
+ Condense / modularize portions of the various seed scripts provided as there are some repititive parts.
>>>>>>> master
