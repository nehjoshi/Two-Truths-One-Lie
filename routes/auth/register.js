const User = require('../../models/UserModel');
const bcrypt = require('bcryptjs');
const router = require('express').Router();

router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        return res.status(200).json({ message: 'User created successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
})
module.exports = router;