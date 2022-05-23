const express = require('express');
const mongoose = require('mongoose');
const app = express();
const datastore = require('./config/datastores').datastores;

const port = require('./config/custom').port;

app.use(express.json({
  type: ['application/json', 'text/plain']
}));

try {
  mongoose.connect(datastore.mongodb.URI)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))
} catch(err) {
  console.log("err ::" + err);
}

app.listen(port);
app.use('/', require('./config/routes.js'));

// const connectDB = require("./config/db");
// require("dotenv").config();

// app.use(express.static("public"));

// const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/views/index.html");
// });

// //Connecting DB
// connectDB();

// //Body parser

// //routing
// app.use("/api/users", require("./routes/users"));

// app.listen(port, () => {
//   console.log(`Server Up and Running on port ${port}`);
// });