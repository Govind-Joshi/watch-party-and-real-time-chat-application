const { Server } = require("socket.io");
const {sendToDataBase,recivedata,cleanUpOldSessions} = require('../utils/util')
const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  
//   console.log('ccc', io.sockets.adapter.rooms.get('session-vespg63kv')?.size )
  io.on("connection", (socket) => {
    cleanUpOldSessions()
    console.log("New client connected:", socket.id);

    socket.emit("welcome", {clientId:socket.id});

    socket.on("clientEvent", async(data) => {
      console.log("Received from client:", data);
     
  
   
      socket.join(data.data);
      console.log(`Client ${socket.id} joined room ${data.data}`);
      const roomSize = io.sockets.adapter.rooms.get(data.data)?.size ||0;
console.log(roomSize,'roomsize...',data.data,'data.data', io.sockets.adapter.rooms.get(data.data))
      if (roomSize === 1) {
       await sendToDataBase( socket.id,data.data,data.globalFlag,Date.now())
          console.log(`Room  is newly created by ${socket.id}`);
          io.to(socket.id).emit('createrObj',{iscontrol:true,isyoucreater:true,createrSocketId:socket.id})

      } else {
      let creterId =   await recivedata(data.data);
      console.log('runn 2222222222......',creterId)
      let f = data?.globalFlag?!data?.globalFlag:true;
          console.log(`${socket.id} is joining existing room`);
          io.to(socket.id).emit('createrObj',{iscontrol:f,isyoucreater:false,createrSocketId:creterId})
      }
      
  
      socket
        .to(data.data)
        .emit("newConnection", "A new client has connected to the room.");

        // socket.emit('settime',{timestamp:video?.currentTime||0,createrSocketId:createrSocketId});

        socket.on('settime',(data)=>{
            console.log('settt.. timeee XXXX',data)
            io.to(data.createrSocketId).emit('settime',{ff:"cheack time"})
        })
      
//  socket.emit('newtime',{timestamp:video.currentTime});

socket.on('newtime',(d)=>{
    // socket.emit('newtime',d)
    console.log('runnew rooommmm....',d);
    socket.to(d.room).emit('newtime',d)
})


      socket.on("videoEvent", (event) => {
        console.log(
          `Received event ${event.type} from ${socket.id} at time ${event.time}`
        );
        let room = event.roomId;
        socket.to(room).emit("videoEvent", event);
        // socket.broadcast.emit('videoEvent', event);
      });

      socket.on("chatmsg", (event) => {
        console.log("chatmsg", event);
        let room = event.roomId;
        socket.to(room).emit("chatmsg", event);
        //   socket.broadcast.emit('chatmsg',event);emoji_gif
      });

      socket.on("emoji_gif", (event) => {
        console.log("chatmsg", event);
        let room = event.roomId;
        socket.to(room).emit("emoji_gif", event);
        //   socket.broadcast.emit('chatmsg',event);emoji_gif
      });

      socket.on("imageBlob", (imageData) => {
        console.log("Received image:", imageData);
        //   socket.broadcast.emit('imageBlob', imageData);
        let room = imageData.roomId;
        socket.to(room).emit("imageBlob", imageData);
      });
      socket.on("memeurl", (imageData) => {
        console.log("Received image:", imageData);
        //   socket.broadcast.emit('imageBlob', imageData);
        let room = imageData.roomId;
        socket.to(room).emit("memeurl", imageData);
      });




      socket.on('destroySession', (r) => {
        console.log('destroySession event received.');
        let roomName = r.roomId;
        const roomIds = io.sockets.adapter.rooms.get(roomName);
    
        if (roomIds) {
            console.log(`Room "${roomName}" found with ${roomIds.size} sockets.`);
            for (const socketId of roomIds) {
                console.log(`Socket ID in room: ${socketId}`);
                const socket = io.sockets.sockets.get(socketId);
                if (socket) {
                    socket.leave(roomName);
                    socket.emit('roomClosed', `The room ${roomName} has been closed.`);
                    console.log(`Socket ${socketId} has left the room.`);
                } else {
                    console.log(`Socket with ID ${socketId} not found.`);
                }
            }
            console.log(`Room "${roomName}" has been destroyed.`);
        } else {
            console.log(`Room "${roomName}" does not exist.`);
        }
    });

  socket.on('leaveSession', (roomName) => {
    console.log('leave...')
      socket.leave(roomName);
  });
  
    });

  

socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);

    // // Optionally, check if the room should be "destroyed" (i.e., all participants have left)
    // const rooms = Array.from(socket.rooms); // Get rooms the socket was part of
    // rooms.forEach((room) => {
    //     if (io.sockets.adapter.rooms.get(room)?.size === 0) {
    //         console.log(`Room ${room} is empty and can be considered destroyed.`);
    //         // Any additional logic to "destroy" the room, if needed
    //     }
    // });
});





  });



//   const roomName = 'session-pupiw33l2';
//   const room = io.sockets.adapter.rooms.get(roomName);
  
//   if (room) {
//       console.log(`Room "${roomName}" exists with ${room.size} clients.`);
//   } else {
//       console.log(`Room "${roomName}" does not exist.`);
//   }
};


module.exports = { createSocketServer };

// //8888888888888888888888888
// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   // Listen for a request to join a room
//   socket.on("joinRoom", (room) => {
//     socket.join(room);
//     console.log(`Client ${socket.id} joined room ${room}`);
//     socket
//       .to(room)
//       .emit("newConnection", "A new client has connected to the room.");

//     // Handle chat message in the room
//     socket.on("chatmsg", (msg) => {
//       socket.to(room).emit("chatmsg", msg);
//     });

//     // Handle video event in the room
//     socket.on("videoEvent", (event) => {
//       socket.to(room).emit("videoEvent", event);
//     });

//     // Handle image blob in the room
//     socket.on("imageBlob", (imageData) => {
//       socket.to(room).emit("imageBlob", imageData);
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// Assuming you're inside a function with access to `io`
