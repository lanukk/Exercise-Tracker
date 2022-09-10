const ExerciseDetails = require('../../models/ExerciseDetails');
const jwt = require('../../helpers/jwt/verify');
const _ = require('lodash');
module.exports = {
    fn: async function(req, res){
        try {

            const decodedToken = await jwt.fn(req, res, req.cookies['exercise-tracker']);
            console.log('decodedToken');
            console.log(decodedToken);
            const user_id = decodedToken.sub;

            const exerciseDetails = await ExerciseDetails.findOne({
                user_id
            });

            if(_.isUndefined(exerciseDetails)){
                error.push('exercise details not found')
                return res.status(404).send({
                    'errors': error
                });
            }

            const exercise = exerciseDetails.exercise;

            let dayWise = new Array(7);
            for(let i = 0; i < 7; i++){
                dayWise[i] = new Array(0);
            }

            exercise.forEach((obj)=>{
                const name = obj.name;
                const week = obj.week;
                
                for(let i = 0; i < 7; i++){
                    if(week[i]) {
                        dayWise[i].push(name);
                    }
                }
            });

            const days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];

            const response = [];

            days.forEach((name, indx)=>{
                response.push({
                    'Day': name,
                    'Exercise': dayWise[indx]
                })
            })

            return res.status(200).send({
                'success': true,
                'data': response
            })

        } catch(err) {
            console.log(err);
            return res.status(400).send(err)
        }

    }
}