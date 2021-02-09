const express = require("express");

const router = express.Router();

const db = require("../dbfunctions");

router.post("/check", async (req, res) => {
  if (req.body.user_id === undefined || req.body.hunt_id === undefined) {
    res.json({ status: "failed", message: "Parameter missing" });
  } else {
    // Check in the records
    const result = await db.checkHuntRecords(req.body);
    if (result === null || result === undefined) {
      // Get hunt details
      const huntDetails = await db.getHuntById(req.body.hunt_id);

      // Get user details
      const userDetails = await db.getUserDetails(req.body.user_id);

      // Create a new record
      const newRecord = await db.createHuntsRecord(
        req.body,
        huntDetails,
        userDetails
      );

      res.json({
        status: "created",
        message: "Hunt record created successfully.",
        record: newRecord,
      });
    } else {
      // Send hunt record details
      res.json({ status: "exists", message: "Hunt already exists" });
    }
  }
});

module.exports = router;
