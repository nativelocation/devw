const socket = io => {
  const chat = io.of('/goal_socket');
  chat.on('connection', (socket) => {

    socket.on('JOIN_ROOM', (id) => {
      console.log('JOIN_ROOM', id);
      socket.join('ROOM_GOAL');
    });

    socket.on('CHANGE', (data) => {
      console.log('TYPING', data);
      socket.to('ROOM_GOAL').emit('NEWCHANGE', { data });//not using
    });
  });
}

module.exports = { socket };