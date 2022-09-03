/** @format */

var express = require("express");
const Validator = require("fastest-validator");
var router = express.Router();
const SibApiV3Sdk = require("sib-api-v3-sdk");

// ** validation
const v = new Validator();

// ** image upload
const multer = require("multer");
const path = require("path");

const { GetInTouch } = require("../models");
const { response } = require("express");

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
  const client = SibApiV3Sdk.ApiClient.instance;
  var apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
  const schema = {
    name: "string",
    email: "string",
    message: "string",
    messageId: "string",
  };

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = `Email from ${req.body.name} - ${req.body.email} in website fachalik`;
  sendSmtpEmail.htmlContent = `<html><body><h1>You got email from ${req.body.name} with email ${req.body.email}</h1><p>${req.body.message}<p></body></html>`;
  sendSmtpEmail.sender = {
    name: req.body.name,
    email: req.body.email,
  };
  sendSmtpEmail.to = [{ email: "fachalik@gmail.com", name: "FA Chalik" }];

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    async function (data) {
      let info = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        messageId: data.messageId,
      };
      const validate = v.validate(info, schema);

      if (validate.length) {
        return res.json({ status: 400, data: validate }).status(400);
      }
      // console.log(
      //   "API called successfully. Returned data: " + JSON.stringify(data)
      // );
      const getInTouch = await GetInTouch.create(info);
      await res.json({ status: 200, data: getInTouch }).status(200);
    },
    function (error) {
      console.error(error);
      return res.json({ status: 400, data: error }).status(400);
    }
  );
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
