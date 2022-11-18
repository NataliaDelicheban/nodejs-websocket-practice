const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    message: {
        type: String,
    },
    user: {
        type: String,
    },
    users: {
        type: Array,
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);