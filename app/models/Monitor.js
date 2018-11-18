// Here is booking collection schema is defined
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const monitorSchema = new Schema(
  {
    url: {
      type: String,
      default: null,
      unique: true,
    },
    method: {
      type: String,
      default: null,
    },
    data: {},
    headers: {},
  },
  {
    timestamps: true,
  },
  {
    strict: false,
  },
);

module.exports = monitorSchema;
