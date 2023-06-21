'use strict';

const mongoose = require('mongoose');
const schemaUsuario = mongoose.Schema({
    Nombre: {type: String, required: true, unique: false},
    PrimerApellido: {type: String, required: true, unique: false},
    SegundoApellido: {type: String, required: false, unique: false},
    TipoIdentificacion: {type: Number, required: true, unique: false}, // 1 = Fisica, 2= Juridica, 3 = DIMEX, 4 = Pasaporte
    NumeroIdentificacion: {type: Number, required: true, unique: true},
    Correo: {type: String, required: true, unique: true},
    NumeroTelefono: {type: Number, required: true, unique: false},
    DateNacimiento: {type: String, required: true, unique: false},
    Unidad: {type: String, required: false, unique: false},
    FotoPerfil: {type: String, required: false, unique: false},
    Rol: {type: Number, required: false, unique: false}, // 1 = Jefatura, 2 = Proveeduría, 3 = Encargado Unidad
    Estado: {type: Number, required: true, unique: false}, // -1 = inactivo, 0 = pendiente de aprobacion su registro, 1 = activo
    Pw: {type: String, required: false, unique:false} // contrasegna, por primera vez es generada de manera aleatoria en el controller
});

// Unidad es numero o string?

module.exports = mongoose.model('Usuario', schemaUsuario, 'Usuarios');