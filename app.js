//Node Modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');
const cron = require('node-cron');
const app = express();
const http = require("http");
const Game = require('./models/GameModel');
const User = require('./models/UserModel');
app.use(cors());
dotenv.config();
app.use(express.json());

//Routes
const Register = require('./routes/auth/register');
const Login = require('./routes/auth/login');
const GetTruthsAndLies = require('./routes/userInfo/truthsAndLies');
const InitGame = require('./routes/game/InitGame');
const LobbyInfo = require('./routes/game/LobbyInfo');
app.use('/', Register);
app.use('/', Login);
app.use('/', GetTruthsAndLies);
app.use('/', InitGame);
app.use('/', LobbyInfo);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', async (socket) => { //Deal with web socket connections
    socket.on('join-room', async (roomId, userId) => { //When a user joins a room
        socket.join(roomId);
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
})

cron.schedule("* * * * *", async () => { //Delete unwanted games every 5 minutes
    console.log("Scheduling a cron job");
    // const games = await Game.find();
    // games.forEach(async game => {
    //     if (game.__v === 0){
    //         await Game.deleteOne({ _id: game._id });
    //         console.log("Deleted a garbage game");
    //     }
    // })
    Game.deleteMany({ __v: 0 })
    .then(() => {
    console.log("Deleted garbage games");
    })
    .catch(err => {
    console.log("Error deleting garbage games: ", err);
    })
})


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})