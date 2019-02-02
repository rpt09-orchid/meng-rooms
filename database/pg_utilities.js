let { Client } = require('pg');
require('dotenv').config();

let config = {
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DATABASE
}
let client = new Client(config);
client.connect();


// const RoomModel = mongoose.model('Room', roomSchema);

const findByID = (id, callback) => {
  client.query(`SELECT * FROM rooms WHERE id = ${id}`, (err, res)=>{
    if(err){
      console.log(err);
    }
    callback(undefined, [res.rows[0]]);
  });
};

// const insertOne = (room, callback) => {
//   RoomModel.create(room, callback);
// };

module.exports = {
  findByID
};
