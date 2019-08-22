var mongoose = require('mongoose');

var messageSchema = {
    memberID: String,
    title: String,
    mail: String,
    date: String,
    _id: String,
    transMail: String,
    images: Array
}
var Message = mongoose.model('Message', messageSchema, 'messages');
module.exports = Message;