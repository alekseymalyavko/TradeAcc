import express from 'express';
import authenticationRouter from './authentication-router';
import accountController from '../controllers/account-controller';

const router = express.Router();

router.use('/api/account', authenticationRouter);
router.use('/api/', accountController.checkUserLoginStatus);

module.exports = router;
