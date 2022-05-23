const jwt = require('jsonwebtoken');

module.exports = {
    fn: async function(req, res, payload){
    try {
        const jwtConfig = require('../../../config/jwt');

        const decodedToken = await jwt.verify(payload, jwtConfig.secret);
        
        return decodedToken;

    } catch (err) {
        console.log(err);

        return res.status(400).send(err);
    }
    }
}