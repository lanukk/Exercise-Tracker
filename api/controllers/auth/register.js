const _ = require('lodash');
const validator = require('validator');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const ExerciseDetails = require('../../models/ExerciseDetails');

module.exports = {
    fn: async function(req, res){

        const data = req.body;
        let error = [];

        if(_.isUndefined(data.user_name) || !_.isString(data.user_name) || _.isEmpty(data.user_name)){
            error.push('user_name is missing or empty');
        }

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

            const checkUser = await User.findOne({
                email: data.email
            })

            if(checkUser){
                console.log('User already registerd');
                error.push('email already registered');
                return res.status(401).send({
                    'success': false,
                    'errors': error
                });
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(data.password, salt);   
            const user_id = uuid.v4();

            const user = new User({
                user_name: data.user_name,
                email: data.email,
                salt,
                password_hash: hash,
                user_id
            });

            const savedUser = await user.save();
            
            console.log('User saved successfully')
            console.log(savedUser);

            const exerciseDetails = new ExerciseDetails({
                user_name: data.user_name,
                user_id
            });

            await exerciseDetails.save();

            return res.status(200).send({
                'success': true,
                'data': savedUser
            });

        } catch(err) {

            console.log(err);

            return res.status(400).send(err);
        }
    }
}