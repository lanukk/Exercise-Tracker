const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const datastore = require('./config/datastores').datastores;

const port = require('./config/custom').port;

app.use(express.json({
  type: ['application/json', 'text/plain']
}));

app.use(cookieParser());

try {
  mongoose.connect(datastore.mongodb.URI)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))
} catch(err) {
  console.log("err ::" + err);
}

app.listen(port);
app.use('/', require('./config/routes.js'));