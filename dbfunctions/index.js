const modals = require("../modals");

const usersModal = modals.userModals;

const huntModal = modals.huntModal;

const postsModal = modals.postsModal;

const perform = {};

//create a new user
perform.createANewUser = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = new usersModal({
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

perform.getHuntsByKey = (key) => {
  console.log(key);
  return new Promise((resolve, reject) => {
    huntModal
      .find({ $text: { $search: key } })
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
      post_name: details.post_name,
      address: details.address,
      long: details.long,
      lat: details.lat,
      hunt_id: details.hunt_id,
      hunt_name: details.hunt_name,
      createdBy: details.createdBy,
      information: details.information,
      defaultQuestion: details.defaultQuestion,
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

module.exports = perform;
