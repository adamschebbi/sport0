const express = require("express");
const router = express.Router();

const Player = require("../models/player");

// Business logic: Get All players
router.get("/", (req, res) => {
  Player.find((error, docs) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({
        result: docs,
      });
    }
  });
  console.log("here into business logic of Get All Players");
});
// Business logic: Get player by Id
router.get("/:id", (req, res) => {
  Player.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});
// Business logic: Edit Player By Id
router.put("/:id", (req, res) => {
  if (req.body.avatar) {
    req.body.avatar = replaceCh(req.body.avatar);
  }
  Player.updateOne({ _id: req.params.id }, req.body).then((data) => {
    res.status(200).json({
      result: "edited with success",
    });
  });
});
// Business logic: Add Player
router.post("/", (req, res) => {
  if (req.body.avatar) {
    req.body.avatar = replaceCh(req.body.avatar);
  }
  const player = new Player({
    age: req.body.age,
    name: req.body.name,
    poste: req.body.poste,
    number: req.body.number,
    avatar: req.body.avatar,
    note: req.body.note,
  });
  player.save((error, result) => {
    if (error) {
      console.log(error);
    } else if (result) {
      res.status(200).json({
        result: "added with success",
      });
    }
  });
});
// Business logic: Delete Player
router.delete("/:id", (req, res) => {
  Player.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: "deleted with success",
    });
  });
});
// Business logic: Get IMC
router.post("/player-status", (req, res) => {
  let playerDetails = req.body;
  let message;
  let IMC =
    playerDetails.weight /
    ((playerDetails.height / 100) * (playerDetails.height / 100));
  if (IMC >= 30) {
    message = "Obesity";
  } else if (IMC < 30 && IMC >= 25) {
    message = "Over Weight";
  } else if (IMC < 25 && IMC >= 18.5) {
    message = " Normal";
  } else if (IMC < 18.5) {
    message = "Insufficient";
  }
  res.status(200).json({
    result: IMC,
    resultMessage: message,
  });
});

module.exports = router;
