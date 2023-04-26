const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const mac = require("get-mac-address");
const dbMac = require("../Db/mac");
const User = require("../Db/user");

router.post("/", async (req, res) => {
  const key = req.body.key;
  const macAddress = mac["Wi-Fi"];

  const keyData = await dbMac.find({ productKey: key });
  console.log(keyData);

  if (keyData.length > 0) {
    if (keyData[0].mac === macAddress) {
      return res
        .status(200)
        .json({ success: true, msg: "successfully authenticated" });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "device is already logged in" });
    }
  } else {
    const data = new dbMac({
      productKey: key,
      mac: macAddress,
    });
    const result = await data.save();
    console.log(result);
    return res
      .status(200)
      .json({ success: true, msg: "successfully authenticated" });
  }
});

router.post("/macotp", async (req, res) => {
  const otp = req.body.otp;
  const macAddress = mac["Wi-Fi"];
  const email = req.body.email;
  const key = req.body.key;

  const userData = await User.findOne({ email: email });
  // console.log(userData.otp === otp)

  if (userData) {
    if (userData.otp === otp) {
      await User.updateOne(
        { email: email },
        {
          $set: { otp: "" },
        }
      );
      await dbMac.updateOne(
        { productKey: key },
        {
          $set: { mac: macAddress },
        }
      );
      res
        .status(200)
        .send({
          success: true,
          msg: "Software Logged out successfully from other Device",
        });
    } else {
      res.status(200).send({ success: false, msg: "OTP is invalid" });
    }
  } else {
    res.status(200).send({ error: true, msg: "This email does not exist" });
  }
});

module.exports = router;
