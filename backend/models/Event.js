const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    image: {
        type: String, // Path to the uploaded image
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
