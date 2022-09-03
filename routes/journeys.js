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

const { Journey } = require("../models");

// Upload Image
var absolute_path = __dirname;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `app/Images`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: multer.diskStorage({}),

  // storage: storage,
  // limits: {
  //   fileSize: "2000000",
  // },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

/* GET journey AlL listing. */
router.get("/", async (req, res, next) => {
  const journey = await Journey.findAll();

  if (!journey) {
    return res
      .json({ status: 400, message: "something wrong with server" })
      .status(400);
  }

  return res.json({ status: 200, data: journey }).status(200);
});

/* GET journey AlL listing. */
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const journey = await Journey.findByPk(id);

  if (!journey) {
    return res.json({ status: 400, message: "Journey not found" }).status(400);
  }

  return res.json({ status: 200, data: journey }).status(200);
});

/* POST journey listing. */
router.post("/", upload, async (req, res, next) => {
  const schema = {
    image: "string",
    cloudinary_id: "string",
    jobRole: "string",
    companyName: "string",
    Date: "string",
  };

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let info = {
      image: result.secure_url,
      cloudinary_id: result.public_id,
      jobRole: req.body.jobRole,
      companyName: req.body.companyName,
      Date: req.body.Date,
    };
    const validate = v.validate(info, schema);

    if (validate.length) {
      return res.json({ status: 400, data: validate }).status(400);
    }

    const journey = await Journey.create(info);

    res.json({ status: 200, data: journey }).status(200);
  } catch (err) {
    console.error(err);
  }
});

/* PUT journey listing. */
router.put("/:id", upload, async (req, res, next) => {
  // try {
  const id = req.params.id;
  let journey = await Journey.findByPk(id);
  let info;
  if (req.file !== undefined) {
    await cloudinary.uploader.destroy(journey.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    info = {
      image: result.secure_url,
      cloudinary_id: result.public_id,
      jobRole: req.body.jobRole,
      companyName: req.body.companyName,
      Date: req.body.Date,
    };
  } else {
    info = {
      image: journey.image,
      cloudinary_id: journey.cloudinary_id,
      jobRole: req.body.jobRole,
      companyName: req.body.companyName,
      Date: req.body.Date,
    };
  }

  if (!journey) {
    return res
      .json({ status: 400, data: { message: "Journey not found" } })
      .status(400);
  }

  const schema = {
    image: "string|optional",
    cloudinary_id: "string|optional",
    jobRole: "string|optional",
    companyName: "string|optional",
    Date: "string|optional",
  };

  const validate = await v.validate(info, schema);

  if (validate.length) {
    return res.json({ status: 400, data: validate }).status(400);
  }

  journey = await journey.update(info, { id });
  // res.send("ok");
  res.json({ status: 200, data: journey }).status(200);
  // } catch (err) {
  //   // console.log(err);
  //   res.json(err).status;
  // }
});

/* DELETE journey listing. */
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const journey = await Journey.findByPk(id);

  if (!journey) {
    return res
      .json({ status: 400, data: { message: "Journey not found" } })
      .status(400);
  }
  await cloudinary.uploader.destroy(journey.cloudinary_id);
  await journey.destroy();

  res
    .json({
      status: 200,
      data: { message: `Journey with id ${id} successfully deleted` },
    })
    .status(200);
});

module.exports = router;
