import express from 'express';
import passport from 'passport/lib/index';
import userController from '../controllers/user-controller';
import accountController from '../controllers/account-controller';

const LocalStrategy = require('passport-local').Strategy;


const router = express.Router();
passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await userController.getUser(username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
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
    passport.authenticate('local', async (err, user) => {
      if (err) { return next(err); }
      if (user) {
        await accountController.setCookiesForUser(res, user);
        res.status(200).send(user.username);
      }
    })(req, res, next);
  });


router.route('/signUp')
  .post(async (req, res, next) => {
    try {
      const { username, password, passwordConfirm } = req.body;
      if (password === passwordConfirm) {
        const user = await userController.getUser(username);
        if (!user) {
          await userController.saveUser(username, password);
          res.status(200).send();
        }
      }
      throw new Error();
    } catch (err) {
      next(err);
    }
  });

router.route('/logout')
  .get((req, res, next) => {
    try {
      if (response.data.success) {
        res.status(200).end();
      }
      throw new Error();
    } catch (err) {
      next(err)
    }
  });


module.exports = router;
