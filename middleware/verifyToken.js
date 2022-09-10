const jwt = require('jsonwebtoken');

const VerifyToken = async (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
        req._id = decoded._id;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }

}
module.exports = VerifyToken;