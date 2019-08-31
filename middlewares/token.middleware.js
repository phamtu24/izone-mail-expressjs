const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        jwt.verify(token, process.env.SECRET_KEY,
            (err, payload) => {
                if(!payload) { 
                    return res.status(401).send('Unathorized');
                };
                req.user = payload;
                next();
            })
    } catch(err) {
        res.status(401).send('No token provided');
    }
}

module.exports.checkToken = checkToken;