/** @format */

var express = require("express");
const Validator = require("fastest-validator");
var router = express.Router();
const { cloudinary } = require("../utils/cloudinary");

// ** validation
const v = new Validator();

// ** image upload
const multer = require("multer");
const path = require("path");

const { GetInTouch } = require("../models");

/* GET journey AlL listing. */
router.get("/", async (req, res, next) => {
  const getInTouch = await GetInTouch.findAll();

  if (!getInTouch) {
    return res
      .json({ status: 400, message: "something wrong with server" })
      .status(400);
  }

  return res.json({ status: 200, data: getInTouch }).status(200);
});

/* GET journey AlL listing. */
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const getInTouch = await GetInTouch.findByPk(id);

  if (!getInTouch) {
    return res
      .json({ status: 400, message: "Get In Touch not found" })
      .status(400);
  }

  return res.json({ status: 200, data: getInTouch }).status(200);
});

/* POST journey listing. */
router.post("/", async (req, res, next) => {
  const schema = {
    name: "string",
    email: "string",
    message: "string",
  };

  try {
    let info = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    };
    const validate = v.validate(info, schema);

    if (validate.length) {
      return res.json({ status: 400, data: validate }).status(400);
    }

    const getInTouch = await GetInTouch.create(info);

    res.json({ status: 200, data: getInTouch }).status(200);
  } catch (err) {
    console.error(err);
  }
});

/* PUT journey listing. */
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  let getInTouch = await GetInTouch.findByPk(id);
  let info = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };

  if (!getInTouch) {
    return res
      .json({ status: 400, data: { message: "Get In Touch not found" } })
      .status(400);
  }

  const schema = {
    name: "string|optional",
    email: "string|optional",
    message: "string|optional",
  };

  const validate = await v.validate(info, schema);

  if (validate.length) {
    return res.json({ status: 400, data: validate }).status(400);
  }

  getInTouch = await getInTouch.update(info, { id });
  res.json({ status: 200, data: getInTouch }).status(200);
});

/* DELETE journey listing. */
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const getInTouch = await GetInTouch.findByPk(id);

  if (!getInTouch) {
    return res
      .json({ status: 400, data: { message: "Get In Touch not found" } })
      .status(400);
  }
  await getInTouch.destroy();

  res
    .json({
      status: 200,
      data: { message: `Get In Touch with id ${id} successfully deleted` },
    })
    .status(200);
});

module.exports = router;
