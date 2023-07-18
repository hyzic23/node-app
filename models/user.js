const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//const Schema = require('Schema');
//const { default: mongoose } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},{ timestamps: true});

// Creating a model
const User = mongoose.model('User', userSchema);
module.exports = User;