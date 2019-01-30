import bcrypt from 'bcryptjs';
import User from '../models/User';
import { Errors } from '../utils/constants';

function hidePrivateUserProperties(user) {
    const { username, email, balance } = user;
    return { username, email, balance }
}
async function getUser(props) {
    return User.findOne(props);
}

async function getUserInfo(props) {
    return User.findOne(props, { passwordHash: 0, __v: 0 });
}

async function saveUser(username, email, password) {
    if (username.includes('@')) {
        throw Errors.UsernameMustNotContainsSobaka;
    }

    const passwordHash = await bcrypt.hash(password, Number(process.env.CRYPTO_ITERATIONS));
    return new User({ username, email, passwordHash }).save();
}

async function updateUserPassword(username, newPasswordHash) {
    await User.findOneAndUpdate({ username }, { $set: { passwordHash: newPasswordHash } });
}

async function updateUserBalance(username, balanceChange) {
    const user = await getUserInfo({ username });
    if (user.balance + balanceChange < 0) {
        throw Errors.InsufficientFunds;
    }
    await User.findOneAndUpdate({ username }, { $set: { balance: user.balance + balanceChange } });
}


export default {
    getUser,
    getUserInfo,
    hidePrivateUserProperties,
    updateUserPassword,
    updateUserBalance,
    saveUser,
};