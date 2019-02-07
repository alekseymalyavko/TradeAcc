import Ad from '../models/Ad';
import { Errors } from '../utils/constants';
import userController from './user-controller';

async function isPriceValid(price) {
  return price > 0 && price === `${+price}`;
}

function getAdsByProps(props) {
  return Ad.find(props, { __v: 0 });
}

async function getAmountOfPagesWithAds(perPage) {
  const totalAmount = await Ad.count();
  const pages = Math.ceil(totalAmount / perPage);
  return pages;
}

async function getAdsByPagination(props, page = 1, perPage = 10) {
  const howManyToSkip = (page - 1) * perPage;
  const pages = await getAmountOfPagesWithAds(perPage);
  const adsPortion = await getAdsByProps(props).sort({ timeOfCreation: -1 }).skip(howManyToSkip).limit(+perPage);
  return { pages, ads: adsPortion };
}

function getAdById(_id) {
  return getAdsByProps({ _id });
}

async function createAd({
  creator, description, price, link,
}) {
  if (!isPriceValid(price)) {
    throw Errors.NotValidPrice;
  }
  const isLinkAlreadyUsed = !!(await Ad.findOne({ link }));
  if (isLinkAlreadyUsed) {
    throw Errors.LinkAlreadyUsed;
  }
  return new Ad({
    creator, description, price, link,
  }).save();
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
  getAdsByProps,
  getAdById,
  getAdsByPagination,
};
