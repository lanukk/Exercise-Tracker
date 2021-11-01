const mongoose = require("mongoose");

const db = 'mongodb+srv://kunal:happyhappy123@passport-authentication.p29gv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


const connectDB = async () => {
  await mongoose.connect(db);
  console.log("MongoDB connected...");
};

module.exports = connectDB;