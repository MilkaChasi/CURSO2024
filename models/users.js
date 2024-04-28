'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchem = Schema({
    iduser: Number,
    Name: String,
    Apellido: String,
    Email: String,
    Password: String,
    Edad: Number,
    Grupos: Array,
    Materias: Array
});

module.exports = mongoose.model('usuarios', UserSchem);