// This is the user schema 
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    timeZone: {
      type: String,
      require: true,
      default: null,
    },
  },
  {
    timestamps: true,
  },
  {
    strict: false,
  },
);

module.exports = userSchema;
