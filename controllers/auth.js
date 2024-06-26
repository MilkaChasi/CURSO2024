'use strict'
require('dotenv').config();

var jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

var Users = require('../models/users');
var Sessions = require('../models/accesstoken');

var controller = {

    login_user: function (req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ status: 400, errors: errors.array() })
        }

        var data = req.body;

        Users.findOne({ Email: data.Email })
            .then(usuarios => {

                console.log(data.Password);
                console.log(usuarios.Password);

                // Bcrypt  password DB.
                bcrypt.compare(data.Password, usuarios.Password, function (err, result) {
                    // result == true

                    console.log(result);
                    if (result) {

                        const payload = {
                            user: usuarios
                        }
    
                        let acces_token = jwt.sign(payload, process.env.KEY, {
                            expiresIn: '1d'
                        });
    
                        let today= new Date().toISOString();
    
                        let update_session={
                            user:usuarios.Email,
                            key:acces_token,
                            creationDate:today,
                            expirationDate:'1d',
                            active:true
                        }
                        Sessions.findOneAndUpdate({ user: usuarios.Email }, update_session, {upsert:true, new:true})
                        .then(session => {
            
                            if (!session) {
                                return res.status(401).send({
                                    status: 401,
                                    message: "Usuario no encontrado"
            
                                });
                            }
            
                        
                            return res.status(200).send({
                                status: 200,
                                message: "Login Correcto",
                                token: acces_token
                            });
                        })
                        .catch(error => {
                            console.error(error);
                            return res.status(500).send({
                                status: 500,
                                message: "Usuario No Actualizado",
                            });
                        });
    
    
                    } else {
                        return res.status(401).send({
                            status: 401,
                            message: "Datos no validos",
                        });
                    }

                });


            })
            .catch(error => {
                console.error(error);
                return res.status(401).send({
                    status: 401,
                    message: "Datos no validos",
                });
            });

    },

    logout:function (req,res) {
        const token = req.headers['x-curso2024-acces-token'];
        
       Sessions.findOneAndDelete({ user: req.decoded.user.Email,key:token })
            .then(session => {
               
                if (!session) {
                    return res.status(200).send({
                        status: 200,
                        message: "Token no encontrado"

                    });
                }

                return res.status(200).send({
                    status: 200,
                    message: "SESSION FINALIZADA"

                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "TOKEN INVALIDO",
                });
            });
    }

};


module.exports = controller;
