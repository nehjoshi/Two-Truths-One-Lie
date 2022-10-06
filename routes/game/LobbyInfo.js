const User = require('../../models/UserModel');
const Game = require('../../models/GameModel');
const VerifyToken = require('../../middleware/verifyToken');
const router = require('express').Router();

router.get("/get-lobby-info/:roomId", VerifyToken, async (req, res) => {
    const game = await Game.findOne({ roomId: req.params.roomId });
    if (!game) return res.status(400).send("Game not found");
    const players = game.players.map(player => {
        return {
            name: player.name,
            score: player.score,
            playerId: player._id
        }
    })
    return res.send(players)
});
module.exports = router;