import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  creator: {
    type: String, required: true, minlength: 1, trim: true,
  },
  customer: { type: String, trim: true },
  description: { type: String, trim: true },
  timeOfCreation: { type: Date, default: Date.now() },
  isOpened: { type: Boolean, default: true },
  price: { type: Number, required: true },
  link: {
    type: String, minlength: 1, required: true, trim: true,
  },
  amountOfSubscribers: { type: Number, default: 1000 },
  adID: {
    type: Number, required: true,
  },
});

module.exports = mongoose.model('Ad', AdSchema);
