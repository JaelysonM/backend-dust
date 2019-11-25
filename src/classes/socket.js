const {io, Product} = require('../server');

const send = (req) => {
  io.emit("send",req);
  console.log(`\n\x1b[35m⇉ \x1b[43m\x1b[30m backend - socket.io \x1b[0m Sending a message to all clients [To active item].`);
}
const run = () => {
   console.log(`\n↳ \x1b[43m\x1b[30m backend - socket.io \x1b[0m Successful connection to socket.io.`);
   io.on('connection', socket => {
   io.emit("log", socket);
    console.log(`\n\x1b[32m⇅ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new connection has been opened, id: \x1b[1m${socket.id}\x1b[0m`); 
    console.log(`   \x1b[32m⟲  \x1b[0mLooking for inactive items...\x1b[0m`);
    socket.on('return-purge', r =>  purge(r));

    socket.on('disconnect',  () => {
      console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m The connection with id \x1b[1m${socket.id}\x1b[0m has been closed.`);
    });

    socket.on('forceDisconnect', () =>{
      socket.disconnect();
     });
    search();
  });
}
const purge = async (r) => {
  await Product.findByIdAndRemove(r);
  console.log(`\n\x1b[32m✔ \x1b[43m\x1b[30m backend - socket.io \x1b[0m The item with id \x1b[4m${r}\x1b[0m has been purged [Purchase approved].`);
}
const search = async () => {
  await Product.find({finished: true}, (err,result) => {
         if (err) {
           throw console.error(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A unexpected error occurred.`); 
         }
        if (result.length == 0) {
          console.log(`   \x1b[31m⍉  \x1b[0mThere isn't inactive itens!\x1b[0m`);
        }else {
          console.log(`   \x1b[32m⇄ \x1b[0mPrepare to active ${result.length} itens.\x1b[0m`);
          for (x in result) {
           io.emit('send', result[x]);
           console.log(`\n   \x1b[34m ⟼  \x1b[0m${result[x]._id}`);
         } 
        }        
  });
}
module.exports= {
  send,
  run
}