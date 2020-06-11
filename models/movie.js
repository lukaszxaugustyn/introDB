const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const Movie = new Schema({
    title: {type: String, required: true, unique: true },
    actor: {type: String, required: true },
    date: {type: String, required: true },
    rating: {type: String, required: true },
    stream: {type: String, required: true },
    
})

module.exports = model('movies', Movie);




