const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const User = new Schema({
    name: {type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

module.exports = model('users', User);
