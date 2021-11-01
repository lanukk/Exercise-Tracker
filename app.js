const express = require("express");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();

app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//Connecting DB
connectDB();

//Body parser
app.use(express.urlencoded({ extended: true }));

//routing
app.use("/api/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`Server Up and Running on port ${port}`);
});