const User = require('../models/User');

module.exports = {
    fn: async function(req, res){
        try {
            
            const users = await User.find();
            
            console.log(users);
            return res.status(200).send({
                'success': true,
                'data': users
            });
            
        } catch(err) {

            console.log(err);
            return res.status(400).send(err);

        }

    }
}