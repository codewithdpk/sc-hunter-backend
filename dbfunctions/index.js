const modals = require("../modals/modals");

const usersModal = modals.users;

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
