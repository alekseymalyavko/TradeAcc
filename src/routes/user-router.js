import express from 'express';
import { Errors } from '../utils/constants';
import userController from '../controllers/user-controller';
import accountController from '../controllers/account-controller';


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
router.route('/changePassword')
  .post(async (req, res, next) => {
    try {
      const { username } = req.user;
      const { oldPassword, newPassword } = req.body;
      const userInfo = await accountController.changeUserPassword({ oldPassword, newPassword, username });
      console.log(123);

      res.status(200).send(userInfo);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;