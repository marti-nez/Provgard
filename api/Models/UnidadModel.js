'use strict';

const mongoose = require('mongoose');
const schemaUnidad = mongoose.Schema({
    Nombre: {type: String, required: true, unique: false},
    Descripcion: {type: String, required: true, unique: false},
    Provincia: {type: String, required: true, unique: false},
    Canton: {type: String, required: true, unique: false},
    Distrito: {type: String, required: true, unique: false},
    Segnas: {type: String, required: true, unique: false},
    Estado: {type: Number, required: false, unique: false}, // 0 es inactivo y 1 es activo
    ID: {type: String, required: true, unique: true} // Autogenerado por el sistema
});

// Unidad es numero o string?

module.exports = mongoose.model('Unidad', schemaUnidad, 'Unidades');