const express = require('express');
const bodyParser = require('body-parser');
const Room = require('../database/models/room.js');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

let app = express();

app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

app.get('/details/:id', (req, res) => {
  Room.findByID(req.params.id, (err, roomInfo) => {
    if (err) {
      res.status(404).json({error: `ID ${req.params.id} does not exist in database`});
    } else {
      res.json({data: roomInfo});
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/fallback.html'));
});

module.exports = app;