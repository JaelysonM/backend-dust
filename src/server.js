// Get config file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const requireDir = require('require-dir');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/*
 Mongoose connection
*/
 mongoose.connect(`${process.env.MONGO_URL}/${process.env.DATABASE}`,{useNewUrlParser: true, useFindAndModify: false});
 console.log(`\n↳ \x1b[42m\x1b[30m backend - mongoose \x1b[0m Connection estabilished with database, connected to: \x1b[4m${process.env.DATABASE}\x1b[0m`)
 requireDir('./models');
/*
*/

app.disable('x-powered-by');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/*
 Export consts
*/
module.exports= {
  io,
  Product: mongoose.model('Client')
}
/*
*/

/*
 Run app
*/
app.use('/api', require('./routes'));
const {socket} =requireDir("classes");
socket.run();
/*
*/

server.listen(3333, console.log(`\n↳ \x1b[46m\x1b[30m backend - server \x1b[0m Listening on port: \x1b[4m3333\x1b[0m`));







