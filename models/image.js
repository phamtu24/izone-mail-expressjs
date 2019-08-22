var mongoose = require('mongoose');

var imageSchema = {
    messageID: String,
    url: String
}
var Image = mongoose.model('Image', imageSchema, 'images');
module.exports = Image;