import express from 'express';
import adController from '../controllers/ad-controller';
import userController from '../controllers/user-controller';


const router = express.Router();


router.route('/')
  .get(async (req, res, next) => {
    try {
      const ads = await adController.getAdsByProps();
      res.status(200).send(ads);
    } catch (err) {
      next(err);
    }
  });

router.route('/:adID')
  .get(async (req, res, next) => {
    try {
      const _id = req.params.adID;
      const ads = await adController.getAdsByProps({ _id });
      res.status(200).send(ads);
    } catch (err) {
      next(err);
    }
  });

// вынести в отдельный роут /user ????????

// router.route('/user') 
//   .get(async (req, res, next) => {
//     try {
//       const { username } = req.user;
//       const ads = await adController.getAdsByProps({ creator: username });
//       res.status(200).send(ads);
//     } catch (err) {
//       next(err);
//     }
//   });

// router.route('/user/:userID')
//   .get(async (req, res, next) => {
//     try {
//       console.log(3);
      
//       const _id = req.params.adID;
//       const { username } = await userController.getUserInfo({ _id });
//       const ads = await adController.getAdById({ creator: username });
//       res.status(200).send(ads);
//     } catch (err) {
//       next(err);
//     }
//   });

router.route('/create')
  .post(async (req, res, next) => {
    try {
      const { username } = req.user;
      const { description, price, link } = req.body; // чекать линку????
      const ad = await adController.createAd({ creator: username, description, price, link });
      res.status(200).send(ad);
    } catch (err) {
      next(err);
    }
  });

router.route('/buy') // привязать к :adID/buy ????
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