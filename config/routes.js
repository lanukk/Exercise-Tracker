const express = require('express');
const router = express.Router();


const controllerPath = '../api/controllers';
const policyPath = '../api/policies'


router.get('/health-check', async (req, res) => {

    try{
        const controller = require(controllerPath + '/health-check');

        console.log(req.body);

        controller.fn(req, res);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err)
    }
    
});

router.post('/login', async (req, res) => {

    try{
        const controller = require(controllerPath + '/auth/login');

        console.log(req.body);

        controller.fn(req, res);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
    
});

router.post('/register', async (req, res) => {

    try{
    const controller = require(controllerPath + '/auth/register');

    console.log(req.body);

    controller.fn(req, res);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
    
});


router.post('/add', async (req, res) => {

    try{
        const policy = require(policyPath + '/user-authorization');

        const user_id = await policy.fn(req, res);

        console.log(user_id);
        req.body.user_id = user_id;

        const controller = require(controllerPath + '/exercise/add');

        console.log(req.body);

        controller.fn(req, res);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
    
});

router.get('/fetch', async (req, res) => {

    try{
        const policy = require(policyPath + '/user-authorization');

        const user_id = await policy.fn(req, res);

        console.log(user_id);
        req.body.user_id = user_id;

        const controller = require(controllerPath + '/exercise/fetch');

        console.log(req.body);

        controller.fn(req, res);
    } catch(err) {
        console.log(err);
        return res.status(400).send(err);
    }
    
});

module.exports = router;