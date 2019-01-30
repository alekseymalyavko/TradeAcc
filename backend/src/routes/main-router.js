import express from 'express';
import authenticationRouter from './authentication-router';
import userRouter from './user-router';
import accountController from '../controllers/account-controller';
import adsRouter from './ads-route';


const router = express.Router();

router.use('/api/account', authenticationRouter);
router.use('/api/', accountController.checkUserLoginStatus);
router.use('/api/user', userRouter);
router.use('/api/ads', adsRouter);


module.exports = router;
