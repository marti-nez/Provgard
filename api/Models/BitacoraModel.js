'use strict';

const mongoose = require('mongoose');
const schemaBitacora = mongoose.Schema({
    TipoDeMovimiento: {type: String, required: true, unique: false},
    Fecha: {type: String, required: true, unique: false},
    NombreDelUsuario: {type: String, required: true, unique: false},
    UsuarioId: {type: Number, required: true, unique: false},
    Unidad: {type: String, required: true, unique: false},
});


module.exports = mongoose.model('Bitacora', schemaBitacora, 'Bitacoras');