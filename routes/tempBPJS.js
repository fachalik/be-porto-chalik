/** @format */

var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

// Keluarga : http://103.252.163.191:8000/bpjs/get/keluarga/:niknoka/:birthdate
// Iuran : http://103.252.163.191:8000/bpjs/get/iuran/:niknoka/:birthdate

/* GET home page. */
router.get(
  "/custom/peserta/:niknoka/:birthdate",
  async function (req, res, next) {
    // var absolute_path = __dirname;
    let niknoka = await req.params.niknoka;
    let birthdate = await req.params.birthdate.toString();
    console.log(req.params);

    let tahun = await birthdate.slice(0, 4);
    let bulan = await birthdate.slice(4, 6);
    let hari = await birthdate.slice(6, 8);

    let response = await fetch(
      `http://103.252.163.191:8000/bpjs/get/keluarga/${niknoka}/${tahun}-${bulan}-${hari}`
    )
      .then((res) => res.json())
      .then((json) => {
        return json;
      });

    // await console.log(response);

    await res
      .json({
        // status: 200,
        data: {
          ...response,
        },
      })
      .status(200);
  }
);

router.get(
  "/custom/iuran/:niknoka/:birthdate",
  async function (req, res, next) {
    // var absolute_path = __dirname;
    let niknoka = await req.params.niknoka;
    let birthdate = await req.params.birthdate.toString();
    console.log(req.params);

    let tahun = await birthdate.slice(0, 4);
    let bulan = await birthdate.slice(4, 6);
    let hari = await birthdate.slice(6, 8);

    let response = await fetch(
      `http://103.252.163.191:8000/bpjs/get/tagihan/${niknoka}/${tahun}-${bulan}-${hari}`
    )
      .then((res) => res.json())
      .then((json) => {
        return json;
      });

    // await console.log(response);

    await res
      .json({
        // status: 200,
        data: {
          ...response,
        },
      })
      .status(200);
  }
);

module.exports = router;
