const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    truths: {
        type: Array,
        default: [],
        required: false
    },
    lies: {
        type: Array,
        default: [],
        required: false
    }
});
const User = mongoose.model('Users', Schema);
module.exports = User;