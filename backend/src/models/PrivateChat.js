import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  participants: {
    type: Array, required: true,
  },
  story: {
    type: Array, required: true,
  },
});

module.exports = mongoose.model('PrivateChats', ChatSchema);
