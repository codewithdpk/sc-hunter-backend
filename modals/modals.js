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

module.exports = modals;
