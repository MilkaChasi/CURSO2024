'use strict'

const bcrypt = require('bcrypt');

var Users = require('../models/users');

module.exports = async (job, done) => {
    try {

        let data = job.data;

        //Usuario existente
        Users.findOne({ iduser: data.iduser }) //findOne solo trae un resultado
            .then(usuarios => {


                if (usuarios) { //Esto valida la respuesta si hay un usuario duplicado
                    return done(new Error('Usuario ya existente'));
                }


                //Crypt de Password
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(data.Password, salt, function (err, hash) {
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
                                job.progress(100);
                                return done(null, result);

                            })
                            .catch(error => {
                                return done(error);

                            });
                    });

                });

            })
            .catch(error => {
                return done(error);
            });



    } catch (error) {
        return done(error);
    }

}