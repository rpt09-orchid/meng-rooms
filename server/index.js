const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

let port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
