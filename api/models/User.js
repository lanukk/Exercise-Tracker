const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    password_hash: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('userSchema', userSchema);