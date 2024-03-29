/** @format */

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var journeysRouter = require("./routes/journeys");
var techStackRouter = require("./routes/techStack");
var latestWorkRouter = require("./routes/latestWork");
var getInTouchRouter = require("./routes/getInTouch");
const { env } = require("process");

var app = express();
const port = process.env.PORT || 3300;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/Images", express.static("./public/Images"));

app.use("/", indexRouter);
app.use("/journeys", journeysRouter);
app.use("/tech-stack", techStackRouter);
app.use("/latest-work", latestWorkRouter);
app.use("/get-in-touch", getInTouchRouter);
app.listen(port, () => {
  console.log(`Starting server on Port ${port}`);
});
