const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ClientSchema = new Schema({
  user: {
    nickname: {
      type: String,
      require: true
    },
  },
  client: {
    name: {
      type: String,
      required: false,

    },
    email: {
      type: String,
      required: false,
    }
  },
  info: {
    product_id: {
      type: String,
      required: true,
    },
  },
  finished: {
    type: Boolean,
    default: false,
  }
});
module.exports = mongoose.model('Client', ClientSchema);