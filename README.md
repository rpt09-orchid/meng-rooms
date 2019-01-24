# SDC Project for Rooms Service

## Log
Reviewing Legacy Code:
The seed script is generating only for 100 records.
The goal is to generate 10Million records, 1000 unique records.

Game plan for seed generation:
test inserting data into csv that has commas within and without quotes
tab separate all incoming faker data and insert one record
Create a .tsv file that would be

There are a couple of documents that have embedded sub documents.  If my goal is to change as little legacy code as possible, I need to destructure them first to properly import them into the database.

+ Tried using the createcsvwriter npm package, but realized mongoimport cannot create a nested array upon import (it can create nested objects if you use dot notation in the csv header).  On a fun note, you can import nested objects upon import with a csv file (just make sure the csv headers are titled correctly with dot notation).

+ Used fs module (writeFile and appendFile functions) to write to an external json file where nested arrays can be maintained.  Noticed that writefile will not write my final array / include the initial open / close brackets - had to manually write that in (using promises). Doing this solution, yielded about 10 minutes to generate the the data and 15 minutes to load the data;
Used following upload command: `mongoimport --db rooms --collection rooms --type json --file /Users/mengsung/Desktop/HackReactor/rpt09-sdc/meng-rooms/database/seedFile/testSeed.json --jsonArray --numInsertionWorkers 2`

* Going to try the above step but convert from json to csv as the .json file is 15gb :(

  `mongoimport --db rooms --collection rooms --type csv --file /Users/mengsung/Desktop/HackReactor/rpt09-sdc/meng-rooms/database/seedFile/testSeed.csv --headerline --numInsertionWorkers 2`\
* Two gotchyas to consider -ids have to run consecutively

* Have to eliminate .csv possibility because, you cannot directly import a csv that reflects nested (array) sub documents

* back to json



**A La Carte Solutions: (must select one of each)**


A La Carte - Write to File



|                     	| AppendFile (no Ids) 	| WriteStream (no Ids) 	|
|---------------------	|---------------------	|----------------------	|
| Unique (10,000,000) 	|                     	|                      	|
| Unique (1,000)      	|                     	|                      	|




A La Carte - Insert Id

|                                	| Add id in JSON File 	| Add id in MongoDB 	|
| ------------------------------- | ---------------------	| ------------------- |
| 1000 (must multiply by 10,000) 	|                     	|                   	|
| 10,000,000                     	|                     	|                   	|


A La Carte - Import

|                            	| (no Ids) MongoImport(JSON) 	| (Ids) / MongoImport(JSON) 	|
|----------------------------	|----------------------------	|---------------------------	|
| 1000 (must multiply by 10) 	|                            	|                           	|
| 10,000,000                 	|                            	|                           	|



**Full Meal / Comprehensive Solutions:**

Insert Many

|                     	| Batched (1000) 	| Batched (10,000) 	|
|---------------------	|----------------	|------------------	|
| Unique (10,000,000) 	|      12:22    	|                  	|
| Unique (1,000)      	|                	|                  	|


Write to File w. Parsed Ids

|                     	| AppendFile w. Parsed Ids / MongoImport(JSON) 	| WriteStream w. Parsed Ids / MongoImport(JSON) 	|
| ---------------------	| --------------------------------------------- | ----------------------------------------------- |
| Unique (10,000,000) 	|                                              	|                                               	|
| Unique (1,000)      	| 5 minutes (                                  	|                                               	|

