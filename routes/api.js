'use strict'

const express = require('express');
const { body } = require('express-validator');
var api = express.Router();

var middleware = require('../middleware/middleware');

//seccion de importación
var UserController = require('../controllers/users');
var AuthController = require('../controllers/auth');


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

module.exports = api;