const express = require("express");

const router = express.Router();

const db = require("../dbfunctions");

router.post("/create", async (req, res) => {
  console.log("Body:", req.body);
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

router.post("/get-all", async (req, res) => {
  if (req.body.id === undefined) {
    res.json({ status: "failed", message: "Parameter is missing." });
  } else {
    const allHuntsOfUsers = await db.getAllHunts(req.body.id);
    if (allHuntsOfUsers !== null || allHuntsOfUsers.length !== 0) {
      res.json({
        status: "OK",
        message: "Hunts fetched successfully",
        hunts: allHuntsOfUsers,
      });
    } else {
      res.json({ status: "failed", message: "Failed to fetch hunts." });
    }
  }
});

router.post("/filters", async (req, res) => {
  if (req.body.key === undefined) {
    res.json({ status: "failed", message: "Parameter missing" });
  } else {
    const getHunts = await db.getHuntsByKey(req.body.key);
    res.json({
      status: "OK",
      message: "Hunts fetched succuessfully.",
      hunts: getHunts,
    });
  }
});

router.post("/get", async (req, res) => {
  console.log(req.body);
  if (req.body.id === undefined) {
    res.json({ status: "failed", message: "Hunt id is missing." });
  } else {
    const huntDetails = await db.getHuntById(req.body.id);
    const posts = await db.getHuntsPost(huntDetails.hunt_id);
    res.json({
      status: "OK",
      message: "Hunt fetched successfully",
      hunt: huntDetails,
      posts: posts,
    });
  }
});

router.post("/add_post", async (req, res) => {
  console.log(req.body);
  if (req.body === undefined) {
    res.json({ status: "failed", message: "Parameters missing" });
  } else {
    const details = await db.createAPost(req.body);
    res.json({ status: "OK", message: "Post Created successfully" });
  }
});

module.exports = router;
