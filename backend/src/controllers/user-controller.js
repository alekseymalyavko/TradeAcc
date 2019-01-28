import bcrypt from 'bcrypt';
import User from '../models/User';
import { Errors } from '../utils/constants';

function hidePrivateUserProperties(user){
    const {username, email, balance} = user;
    return {username, email, balance}
}
async function getUser(props) {
    return User.findOne(props);
}

async function getUserInfo(props) {
    return User.findOne(props, { passwordHash: 0, __v: 0, _id: 0 });
}

async function saveUser(username, email, password) {
    if (username.includes('@')) {
        throw Errors.UsernameMustNotContainsSobaka;
    }
    const passwordHash = await bcrypt.hash(password, Number(process.env.CRYPTO_ITERATIONS));
    return new User({ username, email, passwordHash }).save();
}

async function updateUserPassword(username, newPasswordHash) {
    console.log(1234);
    
    await User.findOneAndUpdate({ username }, { $set: { passwordHash: newPasswordHash } });
}


export default {
    getUser,
    getUserInfo,
    hidePrivateUserProperties,
    updateUserPassword,
    saveUser,
};