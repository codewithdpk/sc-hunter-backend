const express = require("express");

const router = express.Router();

const db = require("../dbfunctions");

const { Storage } = require("@google-cloud/storage");
const multer = require("multer");

// Create new storage instance with Firebase project credentials
const storage = new Storage({
  projectId: "scavenger-hunter-1608147586701",
  keyFilename: "../scavenger-hunter.json",
});

// Create a bucket associated to Firebase storage bucket
const bucket = storage.bucket(
  "gs://scavenger-hunter-1608147586701.appspot.com"
);

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
  },
});

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
  let hunts = [];
  if (req.body.id === undefined) {
    res.json({ status: "failed", message: "Parameter is missing." });
  } else {
    const allHuntsOfUsers = await db.getAllTopHunts();
    if (allHuntsOfUsers !== null || allHuntsOfUsers.length !== 0) {
      await Promise.all(
        allHuntsOfUsers.map(async (hunt) => {
          var posts = await db.getHuntsPost(hunt.hunt_id);
          hunts.push({ hunt: hunt, posts: posts });
        })
      );
      res.json({
        status: "OK",
        message: "Hunts fetched successfully",
        hunts: hunts,
      });
    } else {
      res.json({ status: "failed", message: "Failed to fetch hunts." });
    }
  }
});

router.post("/get-users-all", async (req, res) => {
  let hunts = [];
  if (req.body.id === undefined) {
    res.json({ status: "failed", message: "Parameter is missing." });
  } else {
    const allHuntsOfUsers = await db.getAllHunts(req.body.id);
    if (allHuntsOfUsers !== null || allHuntsOfUsers.length !== 0) {
      await Promise.all(
        allHuntsOfUsers.map(async (hunt) => {
          var posts = await db.getHuntsPost(hunt.hunt_id);
          hunts.push({ hunt: hunt, posts: posts });
        })
      );
      res.json({
        status: "OK",
        message: "Hunts fetched successfully",
        hunts: hunts,
      });
    } else {
      res.json({ status: "failed", message: "Failed to fetch hunts." });
    }
  }
});

router.post("/filters", async (req, res) => {
  let hunts = [];
  if (req.body.key === undefined) {
    res.json({ status: "failed", message: "Parameter missing" });
  } else {
    const getHunts = await db.getHuntsByKey(req.body.key);

    await Promise.all(
      getHunts.map(async (hunt) => {
        var posts = await db.getHuntsPost(hunt.hunt_id);
        hunts.push({ hunt: hunt, posts: posts });
      })
    );

    res.json({
      status: "OK",
      message: "Hunts fetched succuessfully.",
      hunts: hunts,
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
    const ownerDetails = await db.getUserDetails(huntDetails.createdBy);
    res.json({
      status: "OK",
      message: "Hunt fetched successfully",
      owner: ownerDetails,
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

router.post("/endingpoint", async (req, res) => {
  console.log(req.body);
  if (req.body.hunt_id === undefined) {
    res.json({ status: "failed", message: "Hunt id is missing" });
  } else {
    // Getting last post
    const lastPost = await db.getLastPost(req.body.hunt_id);

    //
    const result = await db.endingPost(
      req.body.hunt_id,
      lastPost.post_name,
      lastPost.address,
      lastPost.long,
      lastPost.lat
    );

    if (result !== undefined) {
      res.json({
        status: "OK",
        messsage: "Ending point updated successfully.",
      });
    } else {
      res.json({
        status: "failed",
        message:
          "Something went wrong. Not able to update ending point. Please try after some time.",
      });
    }
  }
});

module.exports = router;
