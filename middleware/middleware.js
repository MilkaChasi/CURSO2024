'use strict'

require('dotenv').config();

var jwt = require('jsonwebtoken');

var Sessions = require('../models/accesstoken');

var middleware = {

    userprotectURL: function (req, res, next) {
        //console.log('Hola desde nuestro middleware');

        const token = req.headers['x-curso2024-acces-token'];
        
        if(token) {

            jwt.verify(token, process.env.KEY, (err, decoded)=>{
             if(err){
                return res.status(401).send({
                    status: 401,
                    message: "TOKEN no valido",
                });
             }else{ 


                req.decoded=decoded;

                
                Sessions.findOne({ user:req.decoded.user.Email, key:token, active:true }) 
                .then(session => {
                   
                   
                    if (!session) {
                        return res.status(401).send({
                            status: 401,
                            message: "Session no realizada"
    
                        });
                    }
    
                   next();
                })
                .catch(error => {
                    console.error(error);
                    return res.status(500).send({
                        status: 500,
                        message: "Error detectado en Session",
                    });
                });

          
             }
            });

        }  else {
            return res.status(401).send({
                status: 401,
                message: "Datos no validos",
            });
        }

       

    }

};


module.exports = middleware;