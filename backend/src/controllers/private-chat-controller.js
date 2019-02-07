import PrivateChat from '../models/PrivateChat';

async function getPrivateChat(participants) {
  const chat = await PrivateChat.findOne({ participants: { $all: participants } });
  if (chat) {
    return chat;
  }
  return new PrivateChat({ participants }).save();
}

export default {
  getPrivateChat,
};
