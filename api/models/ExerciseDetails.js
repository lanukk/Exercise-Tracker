const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    "user_id": {
        "type": "String",
        "required": true
    },
    "user_name": {
        "type": "String",
        "required": true
    },
    "exercise": {
        "type": [
        "Mixed"
        ]
    }
});

module.exports = mongoose.model('exerciseSchema', exerciseSchema);