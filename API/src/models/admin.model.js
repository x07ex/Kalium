const { Schema, model } = require("mongoose"),
  { Roles } = require("../settings.json");

const adminSchema = new Schema({
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
    unique: true,
    /** match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]  Removido por errors inconcientes de Regex */
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
    enum: Roles["admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = model("admin", adminSchema);
