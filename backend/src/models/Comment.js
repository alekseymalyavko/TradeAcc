import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  message: {
    type: String, required: true, minlength: 1,
  },
  username: { type: String, required: true },
  topicID: { type: Number, required: true },
});

module.exports = mongoose.model('Comments', CommentSchema);
