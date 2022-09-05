const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});
const User = mongoose.model('Users', Schema);
module.exports = User;