const express = require("express");
const mongoose = require("mongoose");
require("./Db/config");
const app = express();
// const User = require('./db/user')
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4040;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


const userRouter = require("./routes/user");
const keyRouter = require("./routes/productkey");
const optRouter = require("./routes/changepassword");
const macRouter = require("./routes/maccheck");
// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.use("/user", userRouter);
app.use("/productkey", keyRouter);
app.use("/password", optRouter);
app.use("/macaddress", macRouter);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("listening on port on port " + PORT);
});
