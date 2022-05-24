const jwt = require('../helpers/jwt/verify');
const _ = require('lodash');

module.exports = {
    fn: async function(req, res){
    try {
        
        if(!_.has(req, 'cookies') || !_.has(req.cookies, 'exercise-tracker')) {
            return res.status(401).send({
                'success': false,
                'error': 'Unauthorized'
            })
        }

        const decodedToken = await jwt.fn(req, res, req.cookies['exercise-tracker']);
        console.log('decodedToken');
        console.log(decodedToken);
        const user_id = decodedToken.sub;
        return user_id;
        
    } catch (err) {
        console.log(err);

        return res.status(400).send(err);
    }
    }
}