import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String, required: true, minlength: 1, trim: true, unique: true,
  },
  email: {
    type: String, required: true, minlength: 1, trim: true, unique: true,
  },
  passwordHash: { type: String, required: true },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);