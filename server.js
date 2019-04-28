const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(express.static('client/build'));

app.use(routes);

mongoose.Promise = global.Promise;

var MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/games-reloaded';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

// console.log that server is up and running
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


// // GET route to know server is connected
// app.get('/express_backend', (req, res) => {
//   res.json({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });
