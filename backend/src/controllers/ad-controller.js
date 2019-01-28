import Ad from '../models/Ad';
import { Errors } from '../utils/constants';
import userController from './user-controller';

async function isPriceValid(price) {
  if (price <= 0 || price === `${+price}`) {
    return false;
  }
  return true;
}

function getAdById(_id) {
  return Ad.findOne({ _id });
}

function getAds() {
  return Ad.find({}, { __v: 0 });
}

function createAd({ creator, description, price }) {
  if (!isPriceValid(price)) {
    throw Errors.NotValidPrice;
  }
  return new Ad({ creator, description, price }).save();
}

async function buyAd(_id, customer) {
  const { price, creator, isOpened } = await getAdById(_id);
  if (!isOpened) {
    throw Errors.AdAlreadyClosed;
  }

  await userController.updateUserBalance(customer, -price);
  await Promise.all([
    userController.updateUserBalance(creator, price),
    Ad.findOneAndUpdate({ _id }, { customer, isOpened: false }),
  ]);
}

export default {
  createAd,
  buyAd,
  getAds,
}