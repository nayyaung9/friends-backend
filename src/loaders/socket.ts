export default ({ server }) => {
  const io = require('socket.io')(server, {
    rejectUnauthorized: false,
  });

  io.on('connection', socket => {
    const users = []; // we record all active users

    for (const [id, socket] of io.of('/').sockets) {
      users.push({
        userID: id,
        username: 'username here',
      });
    }
    socket.emit('users', users);

    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    socket.on('room', async function (roomId) {
      socket.join(roomId);
    });

    socket.on('event://send-message', async function (msgObject) {
      const data = JSON.parse(msgObject);

      socket.to(data.receiver).emit('event://send-message', {
        content: data.content,
        from: socket.id,
      });
    });
  });
};
