const express = require("express");

const router = express.Router();

const db = require("../dbfunctions");

router.post("/create", async (req, res) => {
  if (req.body === {}) {
    res.json({ status: "failed", message: "Parameter missing" });
  } else {
    const createHunt = await db.createHunt(req.body);
    if (createHunt !== undefined) {
      res.json({
        status: "OK",
        message: "Hunt created successfully.",
        data: createHunt,
      });
    } else {
      res.json({ status: "failed", message: "Failed to create the hunt." });
    }
  }
});

module.exports = router;
