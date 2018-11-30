const mongoose = require('mongoose');

let roomSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  user: String,
  title: String,
  type: String,
  city: String,
  selfCheckin: Boolean,
  superhost: Boolean,
  descriptions: Array,
  amenities: Array,
  sleepingArrangements: Array
});

const RoomModel = mongoose.model('Room', roomSchema);

const findAll = (callback) => {
  RoomModel.find({}, callback);
};

const findByID = (id, callback) => {
  RoomModel.find({id: id}, callback);
};

const insertOne = (room, callback) => {
  RoomModel.create(room, callback);
};

module.exports = {
  findAll,
  findByID,
  insertOne
};