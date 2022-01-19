const express = require("express");
const router = express.Router();

const Blog = require("../models/blog");

function replaceCh(ch) {
  var newCh = ch.replace("C:\\fakepath\\", "assets/images/");
  return newCh;
}

router.get("/", (req, res) => {
  Blog.find((error, docs) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({
        result: docs,
      });
    }
  });
});
router.get("/:id", (req, res) => {
  Blog.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: data,
    });
  });
});
router.put("/:id", (req, res) => {
  if (req.body.image) {
    req.body.image = replaceCh(req.body.image);
  }
  Blog.updateOne({ _id: req.params.id }, req.body).then((data) => {
    res.status(200).json({
      result: "edited with success",
    });
  });
});
router.post("/", (req, res) => {
  if (req.body.image) {
    req.body.image = replaceCh(req.body.image);
  }
  const blog = new Blog({
    date: req.body.date,
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
  });
  blog.save((error, result) => {
    if (error) {
      console.log(error);
    } else if (result) {
      res.status(200).json({
        result: "added with success",
      });
    }
  });
});
router.delete("/:id", (req, res) => {
  Blog.deleteOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      result: "deleted with success",
    });
  });
});

module.exports = router;
