const {io, Product} = require('../server');

const queryPurge= [];

var array = [];

const send = (req) => {
 // io.emit("send",req);
  console.log(`\n\x1b[35m⇉ \x1b[43m\x1b[30m backend - socket.io \x1b[0m Sending a message to all clients [To active item].`);
}
const run = () => {
   console.log(`\n↳ \x1b[43m\x1b[30m backend - socket.io \x1b[0m Successful connection to socket.io.`);


   io.on('connection', socket => {
    var ip = socket.handshake.headers['x-forwarded-for'];
    if (ip != "181.222.158.213") {
      console.log(`\n\x1b[32m⇅ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new connection has been opened, id: \x1b[1m${socket.id}\x1b[0m`); 
      console.log(`   \x1b[32m⟲  \x1b[0mLooking for inactive items...\x1b[0m`);
      search();
    var count =0;
    setTimeout( () => {
      if (array.length> 0 ) {
        array.map(result => {
          if (result != "empty") {
            io.emit('send',result);
            console.log(`\n   \x1b[34m ⟼  \x1b[0m${result._id}`);
            array =["empty"];
            count++;
          }
       });
       if (count >0)
       console.log(`   \x1b[32m⇄ \x1b[0mPrepare to active ${count} itens.\x1b[0m`);
      }
    },1000); 

    }else {
      console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new connection has been force closed because these IP there is not in whitelist, id: \x1b[1m${socket.id}\x1b[0m`); 
      socket.disconnect();
    }
 
    socket.on('return-purge', r =>  purge(r));

    socket.on('disconnect',  () => {
      console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m The connection with id \x1b[1m${socket.id}\x1b[0m has been closed.`);
    });  
  });
}
const purge = async (r) => {
if (!queryPurge.includes(r)) {
  queryPurge.push(r);
  const response= await Product.findByIdAndRemove(r);
  console.log(`\n\x1b[32m✔ \x1b[43m\x1b[30m backend - socket.io \x1b[0m The item with id \x1b[4m${r}\x1b[0m has been purged [Purchase approved].`);
  queryPurge.splice(queryPurge.indexOf(r),queryPurge.indexOf(r));
  array=[];
}
}

const search = async () => {
  await Product.find({finished: true}, (err,result) => {
         if (err) {
           throw console.error(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A unexpected error occurred.`); 
         }
        if (result.length == 0 ) {
          console.log(`   \x1b[31m⍉  \x1b[0mThere isn't inactive itens!\x1b[0m`);
        }else {
          if (array.length == 0) {
           array = result;
          }
        }        
  });
}
module.exports= {
  send,
  run
}