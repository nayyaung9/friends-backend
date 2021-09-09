import express from 'express';

export default ({ app }: { app: express.Application }) => {
  const server = require('http').Server(app);

  const io = require('socket.io')(server, {
    cors: {
      origin: ['http://192.168.1.9:8081'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  app.use(function (req: any, res, next) {
    req.io = io;
    next();
  });

  io.on('connection', socket => {
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
