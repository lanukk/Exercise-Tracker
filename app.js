//requiring packages
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const moment = require('moment');

//requiring server related configs
const datastore = require('./config/datastores').datastores;
const port = require('./config/custom').port;

const app = express();

//setting middlewares
app.use(express.json({
  type: ['application/json', 'text/plain']
}));

app.use(cookieParser());

app.use('/', (req, res, next)=>{
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
  next();
});

try {
  mongoose.connect(datastore.mongodb.URI)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))
} catch(err) {
  console.log("err ::" + err);
}

app.listen(port);
app.use('/', require('./config/routes.js'));