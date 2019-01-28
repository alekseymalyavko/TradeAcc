import express from 'express';
import adController from '../controllers/ad-controller';


const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const ads = await adController.getAds();
      res.status(200).send(ads);
    } catch (err) {
      next(err);
    }
  });

router.route('/create')
  .post(async (req, res, next) => {
    try {
      const { username } = req.user;
      const { description, price } = req.body;
      const ad = adController.createAd({ creator: username, description, price });
      res.status(200).send(ad);
    } catch (err) {
      next(err);
    }
  });

router.route('/buy')
  .put(async (req, res, next) => {
    try {
      const { username } = req.user;
      const { _id } = req.body;
      
      await adController.buyAd(_id, username);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  });

module.exports = router;