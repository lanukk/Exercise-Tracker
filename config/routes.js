const express = require('express');
const router = express.Router();


const path = '../api/controllers';


router.get('/health-check', (req, res) => {

    const controller = require(path + '/health-check');

    console.log(req.body);

    controller.fn(req, res);
    
});

router.post('/login', (req, res) => {

    const controller = require(path + '/auth/login');

    console.log(req.body);

    controller.fn(req, res);
    
});

router.post('/register', (req, res) => {

    const controller = require(path + '/auth/register');

    console.log(req.body);

    controller.fn(req, res);
    
});

module.exports = router;