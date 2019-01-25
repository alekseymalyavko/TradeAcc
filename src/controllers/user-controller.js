import bcrypt from 'bcrypt';
import User from '../models/User';


async function getUser(username) {
    return User.findOne({ username });
}
async function saveUser(username, password) {
    console.log(username, 1111);
    const passwordHash = await bcrypt.hash(password, Number(process.env.CRYPTO_ITERATIONS));
    await new User({ username, passwordHash }).save();
    console.log('saved');

}


export default {
    getUser,
    saveUser,
};