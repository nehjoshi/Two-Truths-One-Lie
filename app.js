//Node Modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');
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
const InitGame = require('./routes/game/InitGame')
app.use('/', Register);
app.use('/', Login);
app.use('/', GetTruthsAndLies);
app.use('/', InitGame);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', async (socket) => {
    console.log("Connected with socket ID: ", socket.id);
    socket.on('join-room', async (roomId, userId) => {
        socket.join(roomId);
        const user = await User.findOne({ _id: userId });
        const game = await Game.findOne({ roomId });
        const players = game.players;
        const player = players.find(player => player._id === userId);
        if (!player){
            players.push({
                _id: userId,
                name: user.name,
                socketId: socket.id,
                score: 0,
            })
        }

    })
})


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})