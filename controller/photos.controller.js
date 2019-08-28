
const Message = require('../models/message');
const Member = require('../models/member');

const getDates = (messages) => {
    let dates = [];
    for (let mess of messages) {
        if (mess.images.length > 0) {
            let date = mess.date;
            date = date.split('').splice(6).join('');
            if (dates.indexOf(date) === -1) {
                dates.push(date)
            }
        }
    };
    return dates;
}

const photosInDate = (messages, date) => {
    let images = [];
    for (let mess of messages) {
        if (mess.date.indexOf(date) !== -1) {
            for (let image of mess.images) {
                images.push({
                    url: image,
                    messageID: mess._id
                })
            }
        }
    }
    return images;
}

module.exports.getAll = async (req, res) => {
    const messages = await Message.find({});
    let dates = getDates(messages);
    let obj = [];
    dates.forEach((date) => {
        let images = photosInDate(messages, date);
        obj.push({
            date: (new Date(date)).toDateString(),
            images: images
        })
    })
    res.json(obj);
}

module.exports.filter = async (req, res) => {
    const member = await Member.find({name: req.params.id})
    const messages = await Message.find({memberID: member[0]._id});
    let dates = getDates(messages);
    let obj = [];
    dates.forEach((date) => {
        let images = photosInDate(messages, date);
        obj.push({
            date: (new Date(date)).toDateString(),
            images: images
        })
    })
    res.json(obj);
}