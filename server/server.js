const mongoose = require('mongoose');
const app = require('./app.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rooms');

const db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
