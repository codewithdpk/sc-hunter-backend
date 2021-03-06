const express = require("express");

const router = express.Router();

const db = require("../dbfunctions");

router.post("/registration", async (req, res) => {
  console.log(req.body);
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

router.post("/login", async (req, res) => {
  console.log("Body:", req.body);
  if (req.body === undefined || req.body === {}) {
    res.json({ status: "warning", message: "All Parameters required." });
  } else {
    switch (req.body.mode) {
      case "email":
        const userInfo = await db.loginWithEmail(req.body);
        if (userInfo !== {} || userInfo !== undefined) {
          res.json({
            status: "OK",
            message: "Logged in successfully.",
            userInfo: userInfo,
          });
        } else {
          res.json({
            status: "user_not_found",
            message: "User not found. Please register.",
          });
        }

        break;

      case "google":
        break;

      case "facebook":
        break;
    }
  }
});

router.post("/auth_google", async (req, res) => {
  console.log(req.body);
  if (req.body === undefined) {
    res.json({ status: "failed", message: "Paramters missing" });
  } else {
    const result = await db.checkUserExistOnNot(req.body.email);

    if (result !== null) {
      // Just login

      res.json({
        status: "OK",
        message: "Logged in successfully",
        userDetails: result,
      });
    } else {
      // Register

      const registredUser = await db.createANewUser(req.body);

      res.json({
        status: "OK",
        message: "User has been registered successfully.",
        userDetails: registredUser,
      });
    }
  }
});

module.exports = router;
