import express from 'express';
import adController from '../controllers/ad-controller';


const router = express.Router();


router.route('/')
  .get(async (req, res, next) => {
    try {
      const { page, perPage, props } = req.query;
      const ads = await adController.getAdsByPagination(props, page, perPage);
      res.status(200).send(ads);
    } catch (err) {
      next(err);
    }
  });

router.route('/create')
  .post(async (req, res, next) => {
    try {
      const { username } = req.user;
      const { description, price, link } = req.body; // чекать линку????
      const ad = await adController.createAd({
        creator: username, description, price, link,
      });
      res.status(200).send(ad);
    } catch (err) {
      next(err);
    }
  });

router.route('/:adID')
  .get(async (req, res, next) => {
    try {
      const id = req.params.adID;
      const ads = await adController.getAdById(id);
      res.status(200).send(ads);
    } catch (err) {
      next(err);
    }
  });

router.route('/:adID/buy')
  .put(async (req, res, next) => {
    try {
      const { username } = req.user;
      const id = req.params.adID;

      await adController.buyAd(id, username);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  });


module.exports = router;
