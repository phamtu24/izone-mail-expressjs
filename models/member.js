const mongoose = require('mongoose');

const memberSchema = {
    _id: String,
    avatar: String,
    name: String
}
const Member = mongoose.model('Member', memberSchema, 'members');
module.exports = Member;