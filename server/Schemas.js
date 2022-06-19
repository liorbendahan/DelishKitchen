
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: 'string', required:true},
    password: {type: 'string', required:true}
});

const UserModule = mongoose.model('users', userSchema);


