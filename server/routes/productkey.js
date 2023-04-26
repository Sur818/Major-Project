const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const Product = require("../Db/productkey");

router.post("/", (req, res, next) => {
  Product.find({ user_id: req.body.id })
    .exec()
    .then((users) => {
      // console.log(users);
      if (users.length >= 1) {
        if (users[0].productKey === req.body.productKey) {
          res.status(200).json({ msg: "Matching...", Key: users[0] });
        } else {
          res.status(200).json({ msg: "Invalid Product Key" });
        }
      } else {
        return res.status(200).json({
          error: "Not found any Product key this email id",
        });
      }
    });
});

module.exports = router;
