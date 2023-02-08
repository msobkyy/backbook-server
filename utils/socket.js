const { Server } = require('socket.io');

let io = new Server();

let users = [];
const addUser = (info, socketId) => {
  const checkUser = users.some((u) => u.info.id === info.id);

  if (!checkUser) {
    users.push({ info, socketId });
  }
};
const userRemove = (socketId) => {
  users = users.filter((u) => u.socketId !== socketId);
};

const findFriendBySoket = (socketId) => {
  return users.find((u) => u.socketId === socketId);
};

const findFrienddById = (userId) => {
  return users.find((u) => u.info.id === userId);
};

const userLogout = (userId) => {
  users = users.filter((u) => u.userId !== userId);
};

module.exports = {
  init: function (server, options) {
    io = new Server(server, options);
    io.on('connection', (socket) => {
      socket.emit('connected');

      socket.on('setup', ({ info }) => {
        const filterdUsers = users.map((u) => u.info);

        socket.emit('online_user', { type: 'connect', info: filterdUsers });

        addUser(info, socket.id);
        users.forEach((user) => {
          if (user.info.id == info.id) return;
          socket.to(user.socketId).emit('online_user', { type: 'add', info });
        });
      });

      socket.on('join_room', (room) => {
        socket.join(room);
      });

      socket.on('typing', ({ room, status }) => {
        socket.in(room).emit('typing', { room, status });
      });

      socket.on('seen', ({ message, chat }) => {
        if (!chat?.users) return console.log('chat.users not defined');

        chat.users.forEach((user) => {
          const onlineUser = findFrienddById(user._id);
          if (onlineUser) {
            socket.to(onlineUser.socketId).emit('seen', { message, chat });
          }
        });
      });

      socket.on('new_message', ({ message, chat }) => {
        if (!chat?.users) return console.log('chat.users not defined');

        chat.users.forEach((user) => {
          if (user._id == message.sender._id) return;
          const onlineUser = findFrienddById(user._id);

          if (onlineUser)
            socket.to(onlineUser.socketId).emit('message_recieved', message);
        });
      });

      socket.on('customize_chat', ({ userId, type, content, chat }) => {
        if (!chat?.users) return console.log('chat.users not defined');

        chat.users.forEach((user) => {
          if (user._id == userId) return;
          const onlineUser = findFrienddById(user._id);
          if (onlineUser)
            socket
              .to(onlineUser.socketId)
              .emit('customize_chat', { type, content, chat: chat._id });
        });
      });

      socket.on('notification', ({ notification }) => {
        if (!notification?.recipient)
          return console.log('chat.users not defined');
        const onlineUser = findFrienddById(notification.recipient);
        if (onlineUser)
          socket
            .to(onlineUser.socketId)
            .emit('new_notification', { notification });
      });

      socket.on('disconnect', () => {
        const d_user = findFriendBySoket(socket.id);

        users.forEach((user) => {
          socket
            .to(user.socketId)
            .emit('online_user', { type: 'remove', info: d_user?.info });
        });
        userRemove(socket.id);
      });
    });
    return io;
  },
  getIO: function () {
    if (!io) {
      throw new Error("Can't get io instance before calling .init()");
    }
    return io;
  },
};
