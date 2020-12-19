const express = require("express");

const router = express.Router();

const db = require("../dbfunctions");

router.post("/regitration", async (req, res) => {
  if (req.body === undefined || req.body.email === undefined) {
    res.json({ status: "warning", message: "All Parameters required." });
  } else {
    const registredUser = await db.createANewUser(req.body);

    res.json({
      status: "OK",
      message: "User has been registered successfully.",
      userDetails: registredUser,
    });
  }
});

module.exports = router;
