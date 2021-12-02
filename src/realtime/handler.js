const models = require('../models');

module.exports = async (io, socket) => {
    // socket.on('message', (data, room) => {
    //     console.log(data)
    //     io.to(room).emit('message', data);
    // });

    socket.on('send-message', async (message, userId ,reviewId)=> {
        const comment = await models.Comment.create({
            content: message,
            userId: userId,
            reviewId: reviewId,
        });
        const result = {
          content: comment.content,
          createdAt: comment.createdAt,
        };
        result.user = await models.User.findByPk(comment.userId, {raw: true,});
        socket.to(reviewId).emit('receive-message', result)
    })
    
    socket.on('join-room', (room)=>{
        console.log(room)
        socket.join(room);
        
    })
  }