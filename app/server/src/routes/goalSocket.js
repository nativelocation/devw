const socket = io => {
  const chat = io.of('/goal_socket');
  chat.on('connection', (socket) => {
    socket.on('GOALCHANGE', (data) => {
      console.log('GOALCHANGE', data);
      socket.to('GOAL_ROOM').emit('NEWGOALCHANGE', data);
    });
    socket.on('JOINGOALROOM', (data) => {
      console.log('JOIN_ROOM');
      socket.join('GOAL_ROOM');
    });

  });
}

module.exports = { socket };