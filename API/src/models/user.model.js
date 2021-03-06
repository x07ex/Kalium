const { Schema, model } = require("mongoose"),
  { Roles } = require("../settings.json");

const userSchema = new Schema({
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
    /** match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]  Removido por errors inconcientes de Regex */
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
    default: Roles.user[0],
    enum: Roles["user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = model("user", userSchema);
