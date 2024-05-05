'use strict'

const express = require('express');
const expressRedisCache = require('express-redis-cache');

const { body } = require('express-validator');
var api = express.Router();

var middleware = require('../middleware/middleware');

//seccion de importación
var UserController = require('../controllers/users');
var AuthController = require('../controllers/auth');
var TestCacheController = require('../controllers/cache');
var TestJobController = require('../controllers/testjob');



const cache = expressRedisCache({
    host:'redis-14430.c273.us-east-1-2.ec2.redns.redis-cloud.com',
    port: 14430,
    auth_pass: 'UvhnwQOIuPLy0etFAijptauKZIrY3o2C',
    expire: 1200
})

//Login
api.post('/login',[
    body("Email").not().isEmpty(),
    body("Password").not().isEmpty()
]
, AuthController.login_user);
api.post('/logout',middleware.userprotectURL,AuthController.logout)



//USUARIOS
//READE
api.get('/user', middleware.userprotectURL, UserController.userList);
api.get('/user/:iduser', middleware.userprotectURL, UserController.userSingular);

//CREATE
api.post('/user',middleware.userprotectURL, [
    body("iduser").not().isEmpty(),
    body("Name").not().isEmpty(),
    body("Apellido").not().isEmpty(),
    body("Password").not().isEmpty(),
    body("Email").not().isEmpty(),
    body("Edad").not().isEmpty()
], UserController.createuser);


//UPDATE
api.put('/user/:iduser',middleware.userprotectURL, [
    body("iduser").not().isEmpty(),
    body("Name").not().isEmpty(),
    body("Apellido").not().isEmpty(),
    body("Password").not().isEmpty(),
    body("Email").not().isEmpty(),
    body("Edad").not().isEmpty()
], UserController.updateuser);

//DELETE
api.delete('/user/:iduser',middleware.userprotectURL, UserController.deleteuser);

// Test cache
api.get('/testcahe',cache.route(),TestCacheController.testcache);

//Test jobs
api.get('/myJob', TestJobController.myjob)


module.exports = api;