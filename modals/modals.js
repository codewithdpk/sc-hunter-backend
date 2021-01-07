const modals = {};

modals.users = (mongoose) => {
  var schema = mongoose.Schema({
    user_id: {
      type: String,
      default: "_" + Math.random().toString(36).substr(2, 9),
    },
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
    hunt_id: {
      type: String,
      default: "_" + Math.random().toString(36).substr(2, 9),
    },
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
    post_id: {
      type: String,
      default: "_" + Math.random().toString(36).substr(2, 9),
    },
    post_name: String,
    address: String,
    long: Number,
    lat: Number,
    hunt_id: String,
    hunt_name: String,
    createdBy: String,
    information: String,
    defaultQuestion: String,
    questionId: {
      type: String,
      default: "_" + Math.random().toString(36).substr(2, 9),
    },
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

module.exports = modals;
