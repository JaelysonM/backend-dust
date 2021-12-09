require('dotenv').config();

const mongoose = require('mongoose');
const requireDir = require('require-dir');
const { Client } = requireDir('../models');

function connect() {
  mongoose.connect(`${process.env.MONGO_URL}/${process.env.DATABASE}`, { useNewUrlParser: true, useFindAndModify: false });
  console.log(`\n↳ \x1b[42m\x1b[30m backend - mongoose \x1b[0m Connection estabilished, connected to: \x1b[4m${process.env.DATABASE}\x1b[0m`)
}

module.exports = {
  connect,
  Client
}