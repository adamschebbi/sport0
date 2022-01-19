const express = require("express");
const router = express.Router();

const Team = require("../models/team");

function replaceCh(ch) {
  var newCh = ch.replace("C:\\fakepath\\", "assets/images/");
  return newCh;
}

// Business logic: Get All Teams
router.get("/", (req, res) => {
  console.log("here into business logic of Get All Teams");
  Team.find((error, docs) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({
        result: docs,
      });
    }
  });
});
// Business logic: Get Team by Id
router.get("/:id", (req, res) => {
  Team.findOne({ _id: req.params.id }).then((data) => {
    if (data) {
      res.status(200).json({
        result: data,
      });
    }
  });
});
// Business logic: Edit Team By Id
router.put("/:id", (req, res) => {
  if (req.body.logo) {
    req.body.logo = replaceCh(req.body.logo);
  }
  Team.updateOne({ _id: req.params.id }, req.body).then((data) => {
    res.status(200).json({
      result: "edited with success",
    });
  });
});
// Business logic: Add Team
router.post("/", (req, res) => {
  if (req.body.logo) {
    req.body.logo = replaceCh(req.body.logo);
  }
  const team = new Team({
    logo: req.body.logo,
    name: req.body.name,
    foundation: req.body.foundation,
    country: req.body.country,
    stadium: req.body.stadium,
  });
  team.save((error, result) => {
    if (error) {
      console.log(error);
    } else if (result) {
      res.status(200).json({
        result: "added with success",
      });
    }
  });
});
// Business logic: Delete Team
router.delete("/:id", (req, res) => {
  Team.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: "deleted with success",
    });
  });
});

module.exports = router;
