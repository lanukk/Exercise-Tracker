const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res) => {

  let users = await User.find();
  res.json(users);

});

router.post("/", async (req, res) => {
  const username = req.body.username;
  User.findOne({username})
      .then(async (data)=>{
        if(data)
          return res.json({
            username,
            _id: data._id
          });

        let user = new User({
            username: req.body.username,
        });

      await user.save();

      return res.json({ 
        username,
        _id: user._id });
      });

});

router.post("/:id/exercises", async (req, res) => {

  let date;
  if (req.body.date) {
    date = new Date(req.body.date);
  } else {
    date = new Date();
  }
  const newExercise = {
    date: date.toDateString(),
    duration: parseInt(req.body.duration),
    description: req.body.description,
  };

 
  let userToUpdate = await User.findByIdAndUpdate(req.params.id, {
    $push: { log: newExercise },
  });

  await userToUpdate.save();
  res.json({
    _id: req.params.id,
    username: userToUpdate.username,
    ...newExercise,
  });

});

router.get("/:id/logs", async (req, res) => {
  
  let user = await User.findById(req.params.id);

  let userLog = user.log.sort((item1, item2) => {
    const item1Date = new Date(item1.date);
    const item2Date = new Date(item2.date);
    return item1Date - item2Date;
  });

  const userObj = {
    _id: user._id,
    username: user.username,
  };

  const filterObj = {};

  if (req.query.from) {
    const fromDate = new Date(req.query.from);
    filterObj["from"] = fromDate.toDateString();
    userLog = userLog.filter((item) => {
      const itemDate = new Date(item.date);
      if (itemDate >= fromDate) {
        return item;
      }
    });
  }

  if (req.query.to) {
    const toDate = new Date(req.query.to);
    filterObj["to"] = toDate.toDateString();
    userLog = userLog.filter((item) => {
      const itemDate = new Date(item.date);
      if (itemDate <= toDate) {
        return item;
      }
    });
  }

  if (req.query.limit) {
    userLog = userLog.slice(0, req.query.limit);
  }

  const logObj = {
    count: userLog.length,
    log: userLog,
  };

  res.json({
    ...userObj,
    ...filterObj,
    ...logObj,
  });

});

module.exports = router;