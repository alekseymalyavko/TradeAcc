import express from 'express';
import accountController from '../controllers/account-controller';
import userController from '../controllers/user-controller';
import adController from '../controllers/ad-controller';


const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    try {
      const { _id } = req.user;
      const userInfo = await userController.getUserInfo({ _id });
      res.status(200).send(userInfo);
    } catch (err) {
      next(err);
    }
  });

router.route('/ads')
  .get(async (req, res, next) => {
    try {
      const { username } = req.user;
      const ads = await adController.getAdsByProps({ creator: username });
      res.status(200).send(ads);
    } catch (err) {
      next(err);
    }
  });
router.route('/changePassword')
  .post(async (req, res, next) => {
    try {
      const { username } = req.user;
      const { oldPassword, newPassword } = req.body;
      const userInfo = await accountController.changeUserPassword({ oldPassword, newPassword, username });
      res.status(200).send(userInfo);
    } catch (err) {
      next(err);
    }
  });

router.route('/balanceUp')
  .post(async (req, res, next) => {
    try {
      const { username } = req.user;
      const { balanceChange } = req.body;
      await userController.updateUserBalance(username, balanceChange);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  });

router.route('/:username')
  .get(async (req, res, next) => {
    try {
      const { username } = req.params;
      const info = await userController.getUserInfo({ username });

      res.status(200).send(info);
    } catch (err) {
      next(err);
    }
  });

router.route('/:username/ads')
  .get(async (req, res, next) => {
    try {
      const { username } = req.params;
      const ads = await adController.getAdsByProps({ creator: username });
      res.status(200).send(ads);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
