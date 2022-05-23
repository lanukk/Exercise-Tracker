const dotenv = require('dotenv');
dotenv.config();

module.exports.datastores = {
    mongodb: {
        URI: process.env.MONGO_URI || ""
    }
};