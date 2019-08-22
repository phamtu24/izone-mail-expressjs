var mongoose = require('mongoose');

var memberSchema = {
    _id: String,
    avatar: String,
    name: String
}
var Member = mongoose.model('Member', memberSchema, 'members');
module.exports = Member;