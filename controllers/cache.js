'use strict'

var controller = {

    testcache: function(req,res){

        let saludos = [];

        for (let index = 0; index < 100000; index++) {
            console.log("Hola soy el número: " + index);
            saludos.push("Hola soy el número: "+ index);
        }
       

        return res.status(200).send({
            status: 200,
            message: "Test de Cache",
            data: saludos
            

        });
    }

};

module.exports = controller;