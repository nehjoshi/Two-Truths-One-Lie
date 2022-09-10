const User = require('../../models/UserModel');
const router = require('express').Router();
const  VerifyToken  = require('../../middleware/verifyToken');

router.get('/get-user-truths-and-lies', VerifyToken, async (req, res) => {
    const {_id} = req;
    const user = await User.findById(_id);
    if(!user) return res.status(400).send('User not found');
    const {truths, lies} = user;
    return res.send({truths, lies});
});
router.post('/new-truth', VerifyToken, async (req, res) => {
    const {_id} = req;
    const {truth} = req.body;
    console.log("Truth" + truth);
    const user = await User.findById(_id);
    if(!user) return res.status(400).send('User not found');
    user.truths.push(truth);
    await user.save();
    return res.send('Truth added');
})
router.post('/new-lie', VerifyToken, async (req, res) => {
    const {_id} = req;
    const {lie} = req.body;
    const user = await User.findById(_id);
    if(!user) return res.status(400).send('User not found');
    user.lies.push(lie);
    await user.save();
    return res.send('Lie added');
})
module.exports = router;