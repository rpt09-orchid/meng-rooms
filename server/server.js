const app = require('./app.js');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rooms');

let db = mongoose.connection;
db.on('error', (err) => {
  console.log('error connecting', err);
});
db.once('open', () => {
  console.log('mongoose connected');
});

let port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});