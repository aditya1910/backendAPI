// This is the user schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const responseTimeSchema = new Schema(
  {
    urlId: {
      type: Schema.Types.ObjectId,
      ref: 'Monitor',
    },
    responseTime: {
      type: Number,
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

module.exports = responseTimeSchema;
