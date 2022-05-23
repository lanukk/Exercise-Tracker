const jwt = require('jsonwebtoken');

module.exports = {
    fn: async function(req, res, payload){
    try {
        const jwtConfig = require('../../../config/jwt');

        const token= jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiry });
        
        return token;

    } catch (err) {
        console.log.error(err);

        return res.status(400).send(err);
    }
    }
}