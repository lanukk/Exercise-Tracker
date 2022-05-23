const _ = require('lodash');
const ExerciseDetails = require('../../models/ExerciseDetails');

module.exports = {
    fn: async function(req, res){

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

            const exerciseDetails = await ExerciseDetails.findOne({
                user_id: data.user_id
            });

            exerciseDetails.exercise.push({
                'name': data.exercise_name,
                'week': data.week
            });

            await ExerciseDetails.updateOne(
                {
                    user_id: data.user_id
                }, {
                    $set: {'exercise': exerciseDetails.exercise}
                }
            )

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