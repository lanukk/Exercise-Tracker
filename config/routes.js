const express = require('express');
const router = express.Router();


const policyPath = '../api/policies';

console.log('Setting up policies');
const appliedPolicy = {
    '/add' : ['/user-authorization'],
    '/fetch' : ['/user-authorization'],
    '/logout' : ['/user-authorization'],
    '/update' : ['/user-authorization']
};

for(const path in appliedPolicy){
    console.log(path)
    console.log(appliedPolicy[path]);
    appliedPolicy[path].forEach((item)=>{
        router.use(path, require(policyPath + item).fn);
    });
}

const controllerPath = '../api/controllers';

const controllers = [
    '/health-check GET /health-check',
    '/login POST /auth/login',
    '/register POST /auth/register',
    '/add PUT /exercise/add',
    '/fetch GET /exercise/fetch',
    '/logout GET /logout',
    '/users GET /users',
    '/update PUT /exercise/update'
];

console.log('Setting up routes');

controllers.forEach((item) => {
    const info = item.split(' ');
    console.log(info);
    router[info[1].toLowerCase()](info[0], require(controllerPath + info[2]).fn);
});

module.exports = router;