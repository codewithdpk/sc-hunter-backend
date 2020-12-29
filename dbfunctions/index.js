const modals = require("../modals");

const usersModal = modals.userModals;

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

module.exports = perform;
