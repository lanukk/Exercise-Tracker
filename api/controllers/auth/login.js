const _ = require('lodash');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('../../helpers/jwt/sign')

module.exports = {
    fn: async function(req, res){

        const data = req.body;
        let error = [];

        if(_.isUndefined(data.email) || !_.isString(data.email) || _.isEmpty(data.email)){
            if(!validator.isEmail(data.email)){
                error.push('email is invalid');
            } else {
                error.push('email is empty or missing.');
            }
        }

        if(_.isUndefined(data.password) || !_.isString(data.password) || _.isEmpty(data.password)){
            error.push('password is missing or empty');
        }

        if(error.length >= 1){
            return res.status(401).send({
                'success': false,
                'errors': error
            });
        }

        try {

            const user = await User.findOne({
                email: data.email
            });

            if(_.isUndefined(user)){
                throw "User not found";
            }

            const hash = bcrypt.hashSync(data.password, user.salt);

            if(hash != user.password_hash){
                return res.status(401).send({
                    'success': false,
                    'errors': ['Unauthorized']
                });
            }

            const payload = {
                sub : user.user_id,
                iss : 'exercise-tracker'
            };

            let token = await jwt.fn(req, res, payload);

            console.log('token: ');
            console.log(token);

            res.cookie('exercise-tracker', token);

            return res.status(200).send({
                'success': true,
                'data': {
                    'jwt': token
                }
            });

        } catch(err) {

            console.log(err);
            return res.status(400).send(err);

        }

    }
}