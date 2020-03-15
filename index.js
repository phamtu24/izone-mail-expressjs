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
const Message = require('./models/message');
const Member = require('./models/member');
const User = require('./models/user');
const { checkToken } = require('./middlewares/token.middleware');
const axios = require('axios');
const querystring = require('querystring');

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/photos', checkToken, photoRoute);
app.use('/mail', checkToken, mailRoute);
app.use('/login', loginRoute);
app.get('/', checkToken, async (req, res) => {
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
app.get('/m/:id', checkToken, MemberController);
app.get('/member', checkToken, async (req, res) => {
    let query = await Member.find();
    res.json(query);
})
app.post('/add', checkToken, AddController);
app.get('/checkAuth', checkToken, (req, res) => {
    res.send('pass')
})
app.get('/changeName', checkToken, async (req, res) => {
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

app.post('/papagoApi', checkToken, (req, res) => {
    const requestBody = {
        source: req.body.sourceLang === 'ko' ? 'ko' : 'ja',
        target: req.body.sourceLang === 'ko' ? 'vi' : 'en',
        text: req.body.sourceText
    };

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Naver-Client-Id': 'kP_gjVo2xaKlgL23Uetb',
            'X-Naver-Client-Secret': 'Gl5ltWKYKR'
        }
    };

    const papago = 'https://openapi.naver.com/v1/papago/n2mt';

    axios({
        method: "POST",
        url: papago,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Naver-Client-Id': 'kP_gjVo2xaKlgL23Uetb',
            'X-Naver-Client-Secret': 'Gl5ltWKYKR'
        },
        data: querystring.stringify(requestBody)
    }).then(result => {
        let a = result.data.message.result.translatedText
        res.send(a)
    }).catch(err => {
        res.send(err)
    })
})


app.post('/delete', checkToken, async (req, res) => {
    try {
        let mes = await Message.findOne({ _id: req.body.id })
        await Message.deleteOne(mes);
        res.send('delele successfully !')
    } catch (err) {
        res.send("can not delete")
    }
})

app.listen(port);