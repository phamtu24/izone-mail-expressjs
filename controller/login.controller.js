const User = require('../models/user');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });
        if (!user) {
            return res.status(404).send('Wrong username or password !');
        }
        const token = jwt.sign({ 
            userId: user.id },
            process.env.SECRET_KEY
        );
        res.status(200).json({
            userId: user._id,
            token: token,
            role: user.role
        });
    } catch(err) {
        res.status(400).send('invalid username or password');
    }
}

module.exports.login = login;
