const express = require('express');
const bodyParser = require('body-parser');
const Room = require('../database/models/room.js');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/rooms/:id', (req, res) => {
  Room.findByID(req.params.id, (err, roomInfo) => {
    if (err) {
      res.status(404).json({error: `ID ${req.params.id} does not exist in database`});
    } else {
      res.json({data: roomInfo});
    }
  });
});

module.exports = app;