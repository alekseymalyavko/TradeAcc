import express from 'express';
import passport from 'passport/lib/index';
import { Errors } from '../utils/constants';
import userController from '../controllers/user-controller';
import accountController from '../controllers/account-controller';

const LocalStrategy = require('passport-local').Strategy;


const router = express.Router();
passport.use(new LocalStrategy(async (username, password, done) => {
  let props;
  if (username.includes('@')) {
    props = { email: username };
  } else {
    props = { username };
  }
  const user = await userController.getUser(props);
  if (!user) {
    return done(null, false, { message: 'Incorrect username or email.' });
  }
  const isPasswordCorrect = await accountController.checkPassword(user, password);
  if (!isPasswordCorrect) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


router.route('/login')
  .post(async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      if (err) {
        next(err);
      }
      if (user) {
        const token = await accountController.createTokenForUser(res, user);
        res.status(200).send({ token });
      }
      res.status(500).send(info);
    })(req, res, next);
  });


router.route('/signUp')
  .post(async (req, res, next) => {
    try {
      const { username, email, password, passwordConfirm } = req.body;
      if (password !== passwordConfirm) {
        throw Errors.PasswordsAreNotTheSame;
      }
      const userWithSameEmail = !!(await userController.getUser({ email }));
      if (userWithSameEmail) {
        throw Errors.UserWithTheSameEmailAlreadyExists;
      }
      const userWithSameUsername = !!(await userController.getUser({ username }));
      if (userWithSameUsername) {
        throw Errors.UserWithTheSameUsernameAlreadyExists;
      }
      const isValidEmail = await accountController.checkEmail(email);
      if (!isValidEmail) {
        throw Errors.NotValidEmail;
      }
      await userController.saveUser(username, email, password);

      const token = await accountController.createTokenForUser(res, user);
      res.status(200).send({ token });
    } catch (err) {
      next(err);
    }
  });



module.exports = router;
