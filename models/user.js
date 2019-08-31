const mongoose = require('mongoose');

const userSchema = {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}

const User = mongoose.model('User', userSchema, 'user');
module.exports = User;