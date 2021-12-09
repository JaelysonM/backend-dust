'use-strict'
require('dotenv').config();

const express = require('express');
const cors = require('cors');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const sockets = require('./services/sockets')(io);


app.disable('x-powered-by');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
sockets.start();
module.exports.sockets = sockets;
app.use('/api', require('./routes'));



server.listen(process.env.PORT || 3333, console.log(`\n↳ \x1b[46m\x1b[30m backend - server \x1b[0m Listening on port: \x1b[4m3333\x1b[0m`));
