'use strict'

const {myJob} = require('../workers/queue');

var controller = {
    myjob: function (req,res){

        let numeros = req.body;

        myJob.add(numeros);

        //console.log('my job, Hola mundo desde el controlador');

        return res.status(200).send({
            status: 200,
            message: "EL JOB FUE RECIBIDO"
        });
    }
};


module.exports= controller;