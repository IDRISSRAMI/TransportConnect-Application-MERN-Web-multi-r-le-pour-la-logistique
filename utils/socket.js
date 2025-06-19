let io;

export const initSocket = (server) => {
  const { Server } = require('socket.io');
  io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('🟢 Nouveau client connecté:', socket.id);

    socket.on('joinRoom', (room) => {
      socket.join(room);
    });

    socket.on('sendNotification', (data) => {
      io.to(data.room).emit('notification', data.message);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Client déconnecté:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io pas encore initialisé');
  return io;
};
