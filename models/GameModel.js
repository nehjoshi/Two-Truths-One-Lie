const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    socketId: String,
    score: {
        type: Number,
        default: 0
    }
});

const GameSchema = new mongoose.Schema({
    name: String,
    roomId: {
        type: String,
        required: true
    },
    players: {
        type: [playerSchema],
        default: [],
        required: true
    },
}, {
    timestamps: true
});
const GameModel = mongoose.model('Games', GameSchema);
module.exports = GameModel;