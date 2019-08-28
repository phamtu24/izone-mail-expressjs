const Member = require('../models/member');
const Message = require('../models/message');

module.exports.getMail = async (req, res) => {
    const message = await Message.find({_id: req.params.id})
    const member = await Member.find({_id: message[0].memberID})
    res.json({
        message: message,
        member: member
    });
}

module.exports.addTrans = async (req, res) => {
    const message = await Message.update({_id: req.body.message[0]._id}, {transMail: req.body.message[0].transMail})
    res.json(message)
}