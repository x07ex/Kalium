const { Schema, model } = require("mongoose");

const adminSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  lastnames: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = model("admin", adminSchema);
