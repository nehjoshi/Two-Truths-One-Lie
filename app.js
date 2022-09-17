//Node Modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
const http = require("http");
app.use(cors());
dotenv.config();
app.use(express.json());

//Routes
const Register = require('./routes/auth/register');
const Login = require('./routes/auth/login');
const GetTruthsAndLies = require('./routes/userInfo/truthsAndLies');
app.use('/', Register);
app.use('/', Login);
app.use('/', GetTruthsAndLies);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log("Connected with socket ID: ", socket.id);
})


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});

server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})