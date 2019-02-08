import express from 'express';
import adController from '../controllers/ad-controller';
import commentsController from '../controllers/comments-controller';


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
      const { adID } = req.params;
      const ads = await adController.getAdById(adID);
      res.status(200).send(ads);
    } catch (err) {
      next(err);
    }
  });

router.route('/:adID/buy')
  .put(async (req, res, next) => {
    try {
      const { username } = req.user;
      const { adID } = req.params;

      await adController.buyAd(adID, username);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  });

router.route('/:adID/comments')
  .get(async (req, res, next) => {
    try {
      const { adID } = req.params;

      const comments = await commentsController.getCommentsByTopicID(adID);
      res.status(200).send(comments);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { username } = req.user;
      const { adID } = req.params;
      const { message } = req.body;

      await commentsController.saveComment(adID, username, message);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
