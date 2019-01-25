import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import User from '../models/User';


async function setCookiesForUser(res, user) {
  const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7 days', // expires in 7 days
  });
  const cookies = [`SSOSESSIONID=${token}; Path=/`];
  res.setHeader('set-cookie', cookies);
}

function checkPassword(user, password) {
  return bcrypt.compare(password, user.passwordHash);
}

async function checkUserLoginStatus(req) {
  const { _id } = await JWT.verify(req.cookies.SSOSESSIONID, process.env.JWT_SECRET);
  if (!_id) {
    throw new Error();
  }
  req.user = { _id };
}

// async function changeUserPassword({ oldPassword, newPassword, userID }) {
//   const vendor = await Vendor.findById({ _id: vendorId });
//   const result = await bcrypt.compare(oldPassword, vendor.passwordHash);
//   if (result) {
//     const newHash = await bcrypt.hash(newPassword, Number(process.env.CRYPTO_ITERATIONS));
//     await Vendor.findOneAndUpdate({ _id: vendorId }, { $set: { passwordHash: newHash } });
//     return Promise.resolve();
//   }
//   return Promise.reject(new Error('can not change password'));
// }

export default {
  setCookiesForUser,
  checkPassword,
  checkUserLoginStatus,
};