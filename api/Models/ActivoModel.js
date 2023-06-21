'use strict';

const mongoose = require('mongoose');
const schemaActivo = mongoose.Schema({
    IDActivo: {type: String, required: true, unique: true},// en controler debe ser autogenerado 000001
    Nombre: {type: String, required: true, unique: false},
    Codigo: {type: String, required: true, unique: false}, // se genera usando el codigo de ubicacion ProvCarPiso1
    UbicacionCodigo: {type: String, required: true, unique: false}, // viene del objeto de unidad + la ubicacion dentro de la unidad prov_Cartago1_piso1
    UbicacionDentroDeLaUnidad: {type: String, required: true, unique: false},
    Unidad: {type: String, required: true, unique: false},
    Descripcion: {type: String, required: true, unique: false},
    EstadoDeAprobacion: {type: Number, required: true, unique: false},// en controller, si es jefatura va a ser igual a 1, si es encargado iguala 0, esto permitira
    // verificar si debe de ir a solicitud de aprobacion o si debe ir directo a reportes
    IdDelSolicitante: {type: Number, required: false, unique: false},// no es unico porque puede haber mas de una solicitud de parte del mismo usuario, no es required
    //porque si es jefatura este dato no se necesita, se aprueba de inmediato.
    FechaDeCreacion: {type: String, required: false, unique: false}
});



module.exports = mongoose.model('Activo', schemaActivo, 'Activos');