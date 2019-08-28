const Member = require('../models/member');
const Message = require('../models/message');

const ID = function () {
    // create auto id for each photos
    return '_' + Math.random().toString(36).substr(2, 9);
};

const dateToString = function(date) {
    if (date.length>=16) {
      date = date.split('');
      date.splice(16, 10);
      date = date.join('');
    }
    date = date.split('T');
    let str = `${date[1]} ${date[0].split('-').join('/')}`;
    return str; 
  };

module.exports = async (req, res) => {
    const member = await Member.find({name: req.body.name})
    const message = await Message.create({
        images : req.body.images,
        _id: `${member[0].name}${ID()}`,
        memberID : member[0]._id,
        title : req.body.title ? req.body.title : 'no title',
        mail : req.body.mail ? req.body.mail : '       ',
        date : req.body.date ? dateToString(req.body.date) : "00:00 2018/10/29",
        transMail : req.body.transMessage ? req.body.transMessage :  "Coming soon ..."
    })
    res.json(message);
}