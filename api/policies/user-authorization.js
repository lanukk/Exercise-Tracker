const _ = require('lodash');

module.exports = {
    fn: async function(req, res, next){
    try {
        
        if(!_.has(req, 'cookies') || !_.has(req.cookies, 'exercise-tracker') || _.isEmpty(req.cookies['exercise-tracker'])) {
            return res.status(401).send({
                'success': false,
                'error': 'Unauthorized'
            })
        }
        
        next();
        
    } catch (err) {
        console.log(err);

        return res.status(400).send(err);
    }
    }
}