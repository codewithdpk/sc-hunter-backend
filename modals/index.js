const mongoose = require("mongoose");
const modals = require("./modals");
const dbConfig = require("../db");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.userModals = modals.users(mongoose);
db.huntModal = modals.hunts(mongoose);

module.exports = db;
