export default ({ server }) => {
  const io = require('socket.io')(server, {
    rejectUnauthorized: false,
    // auth: {
    //   token: 'abc',
    // },
  });

  io.on('connection', socket => {
    console.log('New User Connected');
    const token = socket.handshake.auth.token;
    console.log('token', token);
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
