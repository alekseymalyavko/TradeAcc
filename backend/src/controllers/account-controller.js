import JWT from 'jsonwebtoken';
import emailCheck from 'email-check';
import bcrypt from 'bcrypt';
import { Errors } from '../utils/constants';
import userController from './user-controller';


async function setCookiesForUser(res, user) {
  const token = await JWT.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '7 days', // expires in 7 days
  });
  const cookies = [`SSOSESSIONID=${token}; Path=/`];
  res.setHeader('set-cookie', cookies);
}
async function deleteCookiesForUser(res) {
  const cookies = [`SSOSESSIONID=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`];
  res.setHeader('set-cookie', cookies);
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
    if (!req.cookies.SSOSESSIONID) {
      throw Errors.UserNotLogin;
    }
    const { _id, username } = await JWT.verify(req.cookies.SSOSESSIONID, process.env.JWT_SECRET);
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
  setCookiesForUser,
  deleteCookiesForUser,
  checkPassword,
  changeUserPassword,
  checkEmail,
  checkUserLoginStatus,
};