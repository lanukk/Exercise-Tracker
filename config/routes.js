const express = require('express');
const router = express.Router();


const policyPath = '../api/policies';

const appliedPolicy = {
    '/add' : ['/user-authorization'],
    '/fetch' : ['/user-authorization'],
    '/logout' : ['/user-authorization'],
};

for(const path in appliedPolicy){
    appliedPolicy[path].forEach((item)=>{
        router.use(path, require(policyPath + item).fn);
    });
}

const controllerPath = '../api/controllers';

const controllers = [
    '/health-check GET /health-check',
    '/login POST /auth/login',
    '/register POST /auth/register',
    '/add POST /exercise/add',
    '/fetch GET /exercise/fetch',
    '/logout GET /logout'
];

console.log('Setting up routes');

controllers.forEach((item) => {
    const info = item.split(' ');
    console.log(info);
    router[info[1].toLowerCase()](info[0], require(controllerPath + info[2]).fn);
});

module.exports = router;