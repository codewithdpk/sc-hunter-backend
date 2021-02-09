const modals = {};

modals.users = (mongoose) => {
  var schema = mongoose.Schema({
    user_id: String,
    name: String,
    email: String,
    password: String,
    googleid: String,
    facebookid: String,
    image_url: String,
    mode: String,
    created: { type: Number, default: Date.now() },
    updated: Number,
    status: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  var users = mongoose.model("users", schema, "users");
  return users;
};

modals.hunts = (mongoose) => {
  var schema = mongoose.Schema({
    hunt_id: String,
    createdBy: String,
    name: String,
    startingArea: String,
    completeStartingAddress: String,
    startingLong: Number,
    startingLat: Number,
    endingArea: String,
    endingStartingAddress: String,
    endingLong: Number,
    endingLat: Number,
    created: { type: Number, default: Date.now() },
    updated: Number,
    status: String,
  });

  schema.index({ name: "text", completeStartingAddress: "text" });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  var users = mongoose.model("hunts", schema, "hunts");
  return users;
};

modals.posts = (mongoose) => {
  var schema = mongoose.Schema({
    post_id: String,
    post_name: String,
    address: String,
    long: Number,
    lat: Number,
    post_image: String,
    hunt_id: String,
    hunt_name: String,
    createdBy: String,
    information: String,
    defaultQuestion: String,
    questionId: String,
    answerType: String,
    created: { type: String, default: Date.now() },
    updated: Number,
    status: String,
  });
  // schema.index({ name: "text", completeStartingAddress: "text" });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  var users = mongoose.model("posts", schema, "posts");
  return users;
};

modals.hunt_records = (mongoose) => {
  var schema = mongoose.Schema({
    record_id: String,
    hunt_id: String,
    hunt_name: String,
    player_id: String,
    player_name: String,
    completedPosts: Array,
    startedOn: Number,
    completedOn: Number,
    distance: Number,
    status: String, //started, completed
    createdOn: Number,
    updatedOn: Number,
  });
  // schema.index({ name: "text", completeStartingAddress: "text" });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  var hunt_records = mongoose.model("hunt_records", schema, "hunt_records");
  return hunt_records;
};

module.exports = modals;
