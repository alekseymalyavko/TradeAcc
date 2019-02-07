import socketIO from 'socket.io';
import server from './app';
import accountController from './controllers/account-controller';
import userController from './controllers/user-controller';
import privateChatController from './controllers/private-chat-controller';

const io = socketIO(server);
io
  .of('/chat')
  .use(async (socket, next) => {
    try {
      const { token } = socket.handshake.query;
      const { _id } = await accountController.checkToken(token);
      socket.user = { _id };
      next();
    } catch (err) {
      console.log('AAAAAAAAA', err);
    }
  })
  .on('connect', (socket) => {
    try {
      console.log('hi', socket.user._id);
      socket.on('subscribe', async (room) => {
        const user = await userController.getUser({ _id: room });
        if (!user) {
          // disconnect???
        }
        const chat = await privateChatController.getPrivateChat([room, socket.user._id]);
        socket.join(chat._id, () => {
          socket.room = chat._id;
          socket.emit('ready');
          console.log(`${socket.user._id} Succesfully joined ${chat._id} for speaking with ${user._id}`);
        });
      });
      socket.on('message', async (data) => {
        socket.to(socket.room).emit('answer', data);
      });
    } catch (err) {
      console.log('AAAAAAAAA', err);
    }
  });

