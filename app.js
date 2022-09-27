//Node Modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const http = require("http");

//Import Utilities
const Socket = require('./utils/socket');
const Scheduler = require('./utils/cron');


app.use(cors());
dotenv.config();
app.use(express.json());

//Import Routes
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
Socket(server);
Scheduler();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});