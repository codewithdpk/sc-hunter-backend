const modals = require("../modals");

const usersModal = modals.userModals;

const huntModal = modals.huntModal;

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
      created: { type: Number, default: Date.now() },
      updated: Number,
      status: "Active",
    });
  });
};

module.exports = perform;
