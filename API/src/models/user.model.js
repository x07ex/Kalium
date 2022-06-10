const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  lastnames: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  avatar: {
    type: Object,
    required: false,
  },
  birthday: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    default: "basic",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = model("user", userSchema);
