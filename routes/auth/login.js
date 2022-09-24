const User = require('../../models/UserModel');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) return res.status(400).send('Email or password is wrong');
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');
    const token = await jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    return res.json({code: 'SUCCESS', token: token, _id: user._id});
});
module.exports = router;