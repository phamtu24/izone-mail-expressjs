const Member = require('../models/member');
const Message = require('../models/message');

module.exports = async (req, res) => {
    const member = await Member.find({name: req.params.id})
    const message = await Message.find({memberID: member[0]._id});
    message.sort((a, b) => {
        return (new Date(b.date)) - (new Date(a.date))
    })
    res.send(message);
}