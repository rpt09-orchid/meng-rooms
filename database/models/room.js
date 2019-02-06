const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  user: { type: String, required: true },
  avatar: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  selfCheckin: Boolean,
  superhost: Boolean,
  descriptions: { type: Array, required: true },
  amenities: Array,
  sleepingArrangements: { type: Array, required: true },
});

const RoomModel = mongoose.model('Room', roomSchema);

const findByID = (id, callback) => {

  RoomModel.find({ id }, callback);
};

const insertOne = (room, callback) => {
  RoomModel.create(room, callback);
};

module.exports = {
  findByID,
  insertOne,
  RoomModel
};
