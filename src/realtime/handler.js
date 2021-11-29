const models = require('../models');

module.exports = async (io, socket) => {
    
    socket.on('joinRoom', (room)=>{
        // console.log(room)
        socket.join(room);
        
        socket.on('message', (data, room) => {
            console.log(data)
            io.to(room).emit('message', data);
        });
    })
  }