require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const photoRoute = require('./route/photo.route'); 
const mailRoute = require('./route/mail.route');
const MemberController = require('./controller/member.controller')
const AddController = require('./controller/add.controller');
const Message = require('./models/message');
const Member = require('./models/member');

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/photos', photoRoute);
app.use('/mail', mailRoute);
app.get('/', async (req, res) => {
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
app.get('/m/:id', MemberController);
app.get('/member', async (req, res) => {
    let query = await Member.find();
    res.json(query);
})
app.post('/add', AddController);
app.listen(port);