module.exports = {
    fn: async function(req, res){
        try {
            
            res.cookie('exercise-tracker','');
            return res.status(200).send({
                'success': true,
                'data': 'Successfully logged out'
            })

        } catch(err) {

            console.log(err);
            return res.status(400).send(err);

        }

    }
}