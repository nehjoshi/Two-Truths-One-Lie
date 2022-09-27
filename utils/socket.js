const { Server } = require('socket.io');
const Game = require('../models/GameModel');
const User = require('../models/UserModel');

const Socket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })
    io.on('connection', async (socket) => { //Deal with web socket connections
        socket.on('join-room', async (roomId, userId) => { //When a user joins a room
            socket.join(roomId);
            socket.roomId = roomId;
            const user = await User.findOne({ _id: userId });
            const game = await Game.findOne({ roomId });
            const player = game.players.find(player => player._id === userId);
            if (!player){
                console.log("New PLayer")
                game.players.push({
                    _id: userId,
                    name: user.name,
                    socketId: socket.id,
                    score: 0,
                })
            }
            await game.save()
            .then(() => {
                console.log("Game saved");
            })
            .catch(err => {
                console.log("Error saving game: ", err);
            })
        })

        socket.on('disconnect', async () => { //Delete a player from the game when they disconnect
            console.log("Player with ID: ", socket.id, " has disconnected");
            const game = await Game.findOne({ roomId: socket.roomId });
            console.log("The game that we're looking for is:");
            console.log("Game: ", game);
            const player = game.players.find(player => player.socketId === socket.id);
            if (player){
                console.log("Found Player")
                game.players = game.players.filter(player => player.socketId != socket.id);
            }
            await game.save()
            .then(() => {
                console.log("Game saved");
            })
            .catch(err => {
                console.log("Error saving game: ", err);
            })
    
        })
    })
}
module.exports = Socket;