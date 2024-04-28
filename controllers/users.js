'use strict'

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

var Users = require('../models/users');


var controller = {
    userList: function (req, res) {
        Users.find() //findOne solo trae un resultado
            // { Name: "Milka" }
            .then(usuarios => {
               // console.log(usuarios)

                return res.status(200).send({
                    status: 200,
                    message: "Usuarios Listados",
                    data: usuarios

                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado",
                });
            });

    },


    userSingular: function (req, res) {
        var params = req.params;
        var iduser = params.iduser;

        // console.log(parseInt(iduser));

        Users.findOne({ iduser: parseInt(iduser) }) //findOne solo trae un resultado
            .then(usuarios => {
                console.log(usuarios)

                return res.status(200).send({
                    status: 200,
                    message: "Usuarios Listados",
                    data: usuarios

                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado",
                });
            });

    },

    createuser: function (req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ status: 400, errors: errors.array() })
        }


        var data = req.body;
        console.log(data);
        console.log(data.Name);
        console.log(data.Edad);

        //Usuario existente
        Users.findOne({ iduser: data.iduser }) //findOne solo trae un resultado
            .then(usuarios => {
                console.log(usuarios);

                if (usuarios) { //Esto valida la respuesta si hay un usuario duplicado
                    return res.status(400).send({
                        status: 400,
                        message: "Usuario ya existente"
                          
                    });
                }

                
                //Crypt de Password
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(data.Password, salt, function(err, hash) {
                        // Store hash in your password DB.

                        
                var create_user = new Users();
                create_user.iduser = data.iduser;
                create_user.Name = data.Name;
                create_user.Apellido = data.Apellido;
                create_user.Password = hash;
                create_user.Email = data.Email;
                create_user.Edad = data.Edad;
                create_user.Grupos = data.Grupos;
                create_user.Materias = data.Materias;

                create_user.save()
                    .then((result) => {
                        return res.status(200).send({
                            status: 200,
                            message: "Usuario Almacenado",
                            data: result

                        });

                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).send({
                            status: 500,
                            message: "Error detectado usuario no almacenado",
                        });
                    });

                    });
                });



            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Error detectado",
                });
            });


    },

    updateuser: function (req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ status: 400, errors: errors.array() })
        }

        var params = req.params;
        var iduser = params.iduser;

        var data = req.body;

         //Crypt de Password
         const saltRounds = 10;
         bcrypt.genSalt(saltRounds, function(err, salt) {
             bcrypt.hash(data.Password, salt, function(err, hash) {
                 // Store hash in your password DB.

                 var update_user = {
                    iduser: data.iduser,
                    Name: data.Name,
                    Apellido: data.Apellido,
                    Password:hash,
                    Email:data.Email,
                    Edad: data.Edad,
                    Grupos: data.Grupos,
                    Materias: data.Materias
        
                }
        
                Users.findOneAndUpdate({ iduser: parseInt(iduser) }, update_user)
                    .then(usuarios => {
                        console.log(usuarios);
        
                        if (!usuarios) {
                            return res.status(200).send({
                                status: 200,
                                message: "Usuario no encontrado"
        
                            });
                        }
        
                        return res.status(200).send({
                            status: 200,
                            message: "Usuario Actualizado"
        
                        });
                    })
                    .catch(error => {
                        console.error(error);
                        return res.status(500).send({
                            status: 500,
                            message: "Usuario No Actualizado",
                        });
                    });

             });

         });


    },

    deleteuser: function (req, res) {
        var params = req.params;
        var iduser = params.iduser;

        Users.findOneAndDelete({ iduser: parseInt(iduser) })
            .then(usuarios => {
                console.log(usuarios)

                if (!usuarios) {
                    return res.status(200).send({
                        status: 200,
                        message: "Usuario no encontrado"

                    });
                }

                return res.status(200).send({
                    status: 200,
                    message: "Usuario Eliminado"

                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "Usuario No Eliminado",
                });
            });



    }
};

module.exports = controller;