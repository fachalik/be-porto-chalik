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

const { TechStack } = require("../models");

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
  const techStack = await TechStack.findAll();

  if (!techStack) {
    return res
      .json({ status: 400, message: "something wrong with server" })
      .status(400);
  }

  return res.json({ status: 200, data: techStack }).status(200);
});

/* GET journey AlL listing. */
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const techStack = await TechStack.findByPk(id);

  if (!techStack) {
    return res.json({ status: 400, message: "Journey not found" }).status(400);
  }

  return res.json({ status: 200, data: techStack }).status(200);
});

/* POST journey listing. */
router.post("/", upload, async (req, res, next) => {
  const schema = {
    name: "string",
    website: "string",
    category: "string",
    image: "string",
    cloudinary_id: "string",
  };

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    let info = {
      image: result.secure_url,
      cloudinary_id: result.public_id,
      name: req.body.name,
      website: req.body.website,
      category: req.body.category,
    };
    const validate = v.validate(info, schema);

    if (validate.length) {
      return res.json({ status: 400, data: validate }).status(400);
    }

    const techStack = await TechStack.create(info);

    res.json({ status: 200, data: techStack }).status(200);
  } catch (err) {
    console.error(err);
    return res.json({ status: 400, data: err }).status(500);
  }
});

/* PUT journey listing. */
router.put("/:id", upload, async (req, res, next) => {
  // try {
  const id = req.params.id;
  let techStack = await TechStack.findByPk(id);
  let info;
  if (req.file !== undefined) {
    await cloudinary.uploader.destroy(techStack.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);
    let info = {
      image: result.secure_url,
      cloudinary_id: result.public_id,
      name: req.body.name,
      website: req.body.website,
      category: req.body.category,
    };
  } else {
    info = {
      image: techStack.image,
      cloudinary_id: techStack.cloudinary_id,
      name: req.body.name,
      website: req.body.website,
      category: req.body.category,
    };
  }

  if (!techStack) {
    return res
      .json({ status: 400, data: { message: "Journey not found" } })
      .status(400);
  }

  const schema = {
    image: "string|optional",
    cloudinary_id: "string|optional",
    category: "string|optional",
    image: "string|optional",
    cloudinary_id: "string|optional",
  };

  const validate = await v.validate(info, schema);

  if (validate.length) {
    return res.json({ status: 400, data: validate }).status(400);
  }

  techStack = await techStack.update(info, { id });
  // res.send("ok");
  res.json({ status: 200, data: techStack }).status(200);
  // } catch (err) {
  //   // console.log(err);
  //   res.json(err).status;
  // }
});

/* DELETE journey listing. */
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const techStack = await TechStack.findByPk(id);

  if (!techStack) {
    return res
      .json({ status: 400, data: { message: "Journey not found" } })
      .status(400);
  }
  await cloudinary.uploader.destroy(techStack.cloudinary_id);
  await techStack.destroy();

  res
    .json({
      status: 200,
      data: { message: `Journey with id ${id} successfully deleted` },
    })
    .status(200);
});

module.exports = router;
