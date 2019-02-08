import socketIO from 'socket.io';
import server from './app';
import accountController from './controllers/account-controller';
import userController from './controllers/user-controller';
import privateChatController from './controllers/private-chat-controller';
import { Errors } from './utils/constants';

const io = socketIO(server);
io
  .of('/chat')
  .use(async (socket, next) => {
    try {
      const { token } = socket.handshake.query;
      socket.user = await accountController.checkToken(token);
      next();
    } catch (err) {
      next(err);
    }
  })
  .on('connect', (socket, next) => {
    try {
      socket.on('subscribe', async (companion) => {
        try {
          const user = await userController.getUser({ _id: companion });
          if (!user) {
            throw Errors.NoUserWithID;
          }
          const { _id, history } = await privateChatController.getPrivateChat([companion, socket.user._id]);
          socket.join(_id, () => {
            socket.room = _id;
            socket.emit('ready', history);
          });
        } catch (e) {
          throw Errors.NoUserWithID;
        }
      });
      socket.on('message', async (data) => {
        data.username = socket.user.username;
        data.date = new Date();
        await privateChatController.saveMessage(socket.room, data);
        socket.nsp.to(socket.room).emit('answer', data);
      });
    } catch (err) {
      next(err);
    }
  });

