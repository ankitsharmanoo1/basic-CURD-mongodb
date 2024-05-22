// models/Art.js
const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    artist: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Art', artSchema);
