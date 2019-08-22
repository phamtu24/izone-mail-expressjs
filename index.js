require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const Message = require('./models/message');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.get('/', async (req, res) => {
    let query = await Message.find();
    res.json(query);
})
app.listen(3000);