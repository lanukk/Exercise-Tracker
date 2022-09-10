const _ = require('lodash');
const jwt = require('../../helpers/jwt/verify');
const ExerciseDetails = require('../../models/ExerciseDetails');

module.exports = {
    fn: async function(req, res){

        console.log('exercise/update :: Payload');
        console.log(req.body);

        const data = req.body;
        let error = [];

        if(_.isUndefined(data.exercise_name) || !_.isString(data.exercise_name) || _.isEmpty(data.exercise_name)){
            error.push('exercise_name is missing or empty');
        }

        if(_.isUndefined(data.week) || !_.isArray(data.week) || data.week.length !== 7){
            error.push('week is missing or empty')
        }

        if(error.length >= 1){
            return res.status(401).send({
                'success': false,
                'errors': error
            });
        }

        try {

            const decodedToken = await jwt.fn(req, res, req.cookies['exercise-tracker']);
            console.log('decodedToken');
            console.log(decodedToken);
            const user_id = decodedToken.sub;

            const exerciseDetails = await ExerciseDetails.findOne({
                user_id
            });

            let found = -1;

            exerciseDetails.exercise.forEach((item, indx) => {
                if(item.name.toLowerCase() == data.exercise_name.toLowerCase()){
                    found = indx;
                }
            });

            if(found === -1){
                console.log('Exercise Not Found!');
                return res.status(400).send({
                    'success': false,
                    'errors': ['Exercise Not Found!']
                });
            }

            exerciseDetails.exercise[found].week = data.week;

            await ExerciseDetails.updateOne(
                {
                    user_id
                }, {
                    $set: {'exercise': exerciseDetails.exercise}
                }
            );

            console.log('Exercise Updated');

            return res.status(200).send({
                'success': true,
                'data': exerciseDetails
            });

        } catch(err) {

            console.log(err);
            return res.status(400).send(err);

        }

    }
}