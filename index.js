require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const photoRoute = require('./route/photo.route');
const mailRoute = require('./route/mail.route');
const loginRoute = require('./route/login.route');
const MemberController = require('./controller/member.controller')
const AddController = require('./controller/add.controller');
const crawlerController = require('./controller/crawler.controller')
const {papagoTranslate, googleTranslate} = require('./controller/translate.constroller');
const Message = require('./models/message');
const Member = require('./models/member');
const User = require('./models/user');
const { checkToken } = require('./middlewares/token.middleware');
const { route } = require('./route/photo.route');


const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const router = express.Router();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', router);

router.use('/photos', checkToken, photoRoute);
router.use('/mail', checkToken, mailRoute);
router.use('/login', loginRoute);
router.get('/', checkToken, async (req, res) => {
    let messages = await Message.find();
    messages.sort((a, b) => {
        return (new Date(b.date)) - (new Date(a.date))
    })
    let members = await Member.find();
    res.json({
        messages: messages,
        members: members
    });
})
router.get('/m/:id', checkToken, MemberController);
router.get('/member', checkToken, async (req, res) => {
    let query = await Member.find();
    res.json(query);
})
router.post('/add', checkToken, AddController);
router.get('/checkAuth', checkToken, (req, res) => {
    res.send('pass')
})
router.get('/changeName', checkToken, async (req, res) => {
    try {
        let mes = await Message
            .find({ mail: /Giang/ })
        mes.forEach(async doc => {
            let mail = doc.mail.replace(/Giang/gi, 'USER_NAME');
            await Message.updateOne({ _id: doc._id }, { mail });
            res.send("done")
        })

    } catch (err) {
        res.send("erro")
    }

})

router.post('/papagoApi',checkToken, papagoTranslate);
router.post('/googleApi',checkToken, googleTranslate);


router.post('/delete', checkToken, async (req, res) => {
    try {
        let mes = await Message.findOne({ _id: req.body.id })
        await Message.deleteOne(mes);
        res.send('delele successfully !')
    } catch (err) {
        res.send("can not delete")
    }
})

router.get('/crawl', crawlerController)

app.listen(port);