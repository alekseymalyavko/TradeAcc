import JWT from 'jsonwebtoken';
import emailCheck from 'email-check';
import bcrypt from 'bcryptjs';
import { Errors } from '../utils/constants';
import userController from './user-controller';


async function createTokenForUser(user) {
  const token = await JWT.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '7 days', // expires in 7 days
  });
  return token;
}

function checkPassword(user, password) {
  return bcrypt.compare(password, user.passwordHash);
}

async function checkEmail(email) {
  try {
    const isValid = await emailCheck(email);
    return isValid;
  } catch (err) {
    return false;
  }
}
async function checkUserLoginStatus(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader|| !authHeader.startsWith("Bearer ")) {
      throw Errors.UserNotLogin;
    }

    const token = authHeader.substring(7, authHeader.length);
    const { _id, username } = await JWT.verify(token, process.env.JWT_SECRET);
    if (!_id) {
      throw Errors.UserNotLogin;
    }
    req.user = { _id, username };
    next();
  } catch (err) {
    next(err);
  }
}

async function changeUserPassword({ oldPassword, newPassword, username }) {
  const user = await userController.getUser({ username });

  const isSame = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!isSame) {
    throw Errors.PasswordsAreNotTheSame;
  }
  const newHash = await bcrypt.hash(newPassword, Number(process.env.CRYPTO_ITERATIONS));
  await userController.updateUserPassword(username, newHash);
}

export default {
  createTokenForUser,
  checkPassword,
  changeUserPassword,
  checkEmail,
  checkUserLoginStatus,
};