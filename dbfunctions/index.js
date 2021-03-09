const { reject } = require("lodash");
const { uuid } = require("uuidv4");
const modals = require("../modals");

const usersModal = modals.userModals;

const huntModal = modals.huntModal;

const postsModal = modals.postsModal;

const hunt_recordsModal = modals.hunt_recordsModal;

const perform = {};

//create a new user
perform.createANewUser = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = new usersModal({
      user_id: uuid(),
      name: user.name,
      email: user.email,
      password: user.password,
      googleid: user.googleid,
      facebookid: user.facebookid,
      mode: user.mode,
      image_url: user.image_url,
    });

    newUser
      .save()
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject({ cause: err.message });
      });
  });
};

// Login
perform.loginWithEmail = (obj) => {
  return new Promise((resolve, reject) => {
    usersModal
      .findOne({
        $and: [
          { email: { $eq: obj.email } },
          { password: { $eq: obj.password } },
        ],
      })
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// Create a hunt

perform.createHunt = (obj) => {
  return new Promise((resolve, reject) => {
    const newHunt = new huntModal({
      hunt_id: uuid(),
      createdBy: obj.createdBy,
      name: obj.huntName,
      startingArea: obj.startingAreaName,
      completeStartingAddress: obj.completeStartingAddress,
      startingLong: obj.startingLong,
      startingLat: obj.startingLat,
      endingArea: "none",
      endingStartingAddress: "none",
      endingLong: null,
      endingLat: null,
      updated: Date.now(),
      status: "Active",
    });

    newHunt
      .save()
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// Get all hunts of specific user

perform.getAllHunts = (id) => {
  return new Promise((resolve, reject) => {
    huntModal
      .find({ createdBy: { $eq: id } })
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// Get all hunts of specific user

perform.getAllTopHunts = () => {
  return new Promise((resolve, reject) => {
    huntModal
      .find({ endingStartingAddress: { $ne: "none" } })
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

perform.getHuntsByKey = (key) => {
  console.log(key);
  return new Promise((resolve, reject) => {
    huntModal
      .find({
        $and: [
          { $text: { $search: key } },
          { endingStartingAddress: { $ne: "none" } },
        ],
      })
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// Get a hunt by id

perform.getHuntById = (id) => {
  return new Promise((resolve, reject) => {
    huntModal
      .findOne({ hunt_id: { $eq: id } })
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// Create a post
perform.createAPost = (details) => {
  return new Promise((resolve, reject) => {
    const newPost = new postsModal({
      post_id: uuid(),
      post_name: details.post_name,
      address: details.address,
      long: details.long,
      lat: details.lat,
      post_image: details.post_image,
      voice_url: details.voice_url,
      hunt_id: details.hunt_id,
      hunt_name: details.hunt_name,
      createdBy: details.createdBy,
      information: details.information,
      defaultQuestion: details.defaultQuestion,
      questionId: uuid(),
      answerType: details.answerType,
      updated: Date.now(),
      status: "A",
    });

    newPost
      .save()
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// Get all hunt's posts
perform.getHuntsPost = (hunt_id) => {
  return new Promise((resolve, reject) => {
    postsModal
      .find({ hunt_id: { $eq: hunt_id } })
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// Get a single user details
perform.getUserDetails = (id) => {
  return new Promise((resolve, reject) => {
    usersModal
      .find({ user_id: { $eq: id } }, ["user_id", "name", "email", "image_url"])
      .then((data) => {
        return resolve(data[0]);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// Check if user' email exist or not
perform.checkUserExistOnNot = (email) => {
  return new Promise((resolve, reject) => {
    usersModal
      .findOne({ email: { $eq: email } })
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

//
perform.getLastPost = (hunt_id) => {
  return new Promise((resolve, reject) => {
    postsModal
      .find({ hunt_id: { $eq: hunt_id } })
      // .sort({ post_id: 1 })
      .then((data) => {
        return resolve(data[data.length - 1]);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// Ending point

perform.endingPost = (hunt_id, area, address, long, lat) => {
  console.log(hunt_id, area, address, long, lat);
  return new Promise((resolve, reject) => {
    huntModal
      .updateOne(
        { hunt_id: { $eq: hunt_id } },
        {
          endingArea: area,
          endingStartingAddress: address,
          endingLong: long,
          endingLat: lat,
        }
      )
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

perform.checkHuntRecords = (details) => {
  return new Promise((resolve, reject) => {
    hunt_recordsModal
      .findOne({
        $and: [
          { hunt_id: { $eq: details.hunt_id } },
          { player_id: { $eq: details.user_id } },
        ],
      })
      .then((data) => {
        if (data !== null) {
          return resolve(data);
        } else {
          return resolve(null);
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

perform.createHuntsRecord = (details, huntDetails, userDetails) => {
  return new Promise((resolve, reject) => {
    const record = new hunt_recordsModal({
      record_id: uuid(),
      hunt_id: details.hunt_id,
      hunt_name: huntDetails.name,
      player_id: details.user_id,
      player_name: userDetails.name,
      completedPosts: [],
      startedOn: Math.floor(Date.now() / 1000),
      completedOn: null,
      distance: 0,
      status: "started", //started, completed
      createdOn: Math.floor(Date.now() / 1000),
      updatedOn: Math.floor(Date.now() / 1000),
    });

    record
      .save()
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

perform.getAllHuntsAndUsers = () => {
  return new Promise((resolve, reject) => {
    huntModal
      .find()
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

perform.getPostsDetails = (post_id, hunt_id) => {
  return new Promise((resolve, reject) => {
    postsModal
      .findOne({
        $and: [{ post_id: { $eq: post_id } }, { hunt_id: { $eq: hunt_id } }],
      })
      .then((data) => {
        return resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = perform;
