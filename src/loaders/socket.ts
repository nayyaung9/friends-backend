export default ({ server }) => {
  const io = require('socket.io')(server, {
    rejectUnauthorized: false,
  });

  io.on('connection', socket => {
    console.log('New User Connected');
    const { roomId } = socket.handshake.query;
    console.log('socket.handshake', socket.handshake);
    socket.join(roomId);

    socket.on('room', async function (roomId) {
      console.log(roomId);
      socket.join(roomId);
    });

    socket.on('event://send-message', async function (message) {
      const data = JSON.parse(message);
      console.log(data);
    });
  });
};
