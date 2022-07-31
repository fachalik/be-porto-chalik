/** @format */

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var journeysRouter = require("./routes/journeys");
const { env } = require("process");

var app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// static Images Folder
app.use("/public/images", express.static("./public/images"));

app.use("/", indexRouter);
app.use("/journeys", journeysRouter);

app.listen(port, () => {
  console.log(`Starting server on Port ${port}`);
});
