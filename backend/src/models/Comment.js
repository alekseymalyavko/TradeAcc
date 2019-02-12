import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  date: { type: Date },
  message: {
    type: String, required: true, minlength: 1,
  },
  username: { type: String, required: true },
  topicID: { type: String, required: true },
});

module.exports = mongoose.model('Comments', CommentSchema);
