const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');


const app = express();
app.databaseSelected = "mongo";
const Room = typeof app.databaseSelected === 'undefined' ? require('../database/pg_utilities.js') : require('../database/models/room.js');

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('tiny'));
} else {
  app.use(morgan('dev'));
}

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../client/dist'), { maxAge: '1y' }));
app.use('/:id', express.static(path.join(__dirname, '/../client/dist'), { maxAge: '1y' }));

app.get('/details/:id', (req, res) => {
  Room.findByID(req.params.id, (err, roomInfo) => {
    if (err) {
      res.status(404).json({ error: `ID ${req.params.id} does not exist in database` });
    } else {
      res.json({ data: roomInfo });
    }
  });
});

app.get('/users/:id', (req, res) => {
  Room.findByID(req.params.id, (err, roomInfo) => {
    if (err) {
      res.status(404).json({ error: `ID ${req.params.id} does not exist in database` });
    } else {
      const { id, user, avatar } = roomInfo[0];
      const userInfo = {
        id,
        user,
        avatar,
      };
      res.json({ data: userInfo });
    }
  });
});

module.exports = app;
