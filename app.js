//Node Modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
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


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})