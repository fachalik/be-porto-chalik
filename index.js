/** @format */

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var journeysRouter = require("./routes/journeys");

var app = express();
const port = 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// static Images Folder
app.use("/public/images", express.static("./public/images"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/journeys", journeysRouter);

app.listen(3000, () => {
  console.log(`Starting server on Port ${port}`);
});
