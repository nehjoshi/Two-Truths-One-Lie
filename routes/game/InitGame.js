const Users = require('../../models/UserModel');
const Games = require('../../models/GameModel');
const VerifyToken = require('../../middleware/VerifyToken');
const router = require('express').Router();
const crypto = require('crypto');

router.post('/init-game', VerifyToken, async (req, res) => {
    const { name, socketId } = req.body;
    const { _id } = req;
    //Generate random 6 digit roomId
    const roomId = crypto.randomBytes(6).toString('hex');
    console.log("Room ID is: ", roomId);
    const user = await Users.findOne({ _id });
    const game = await new Games({
        name, roomId, players: [{
            name: "Neh",
            _id,
            socketId
        }]
    })
    try {
        const savedGame = await game.save();
        return res.json({ roomId: savedGame.roomId });
    }
    catch (err) {
        return res.json({ error: err });
    }
    
});
module.exports = router;

