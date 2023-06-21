'use strict';

const mongoose = require('mongoose');
const schemaTraslado = mongoose.Schema({
    IdDelActivo: {type: String, required: true, unique: false},// en controler debe ser autogenerado 000001
    IdDelTraslado: {type: String, required: true, unique: true},// autogenerado
    FechaDeTraslado: {type: String, required: false, unique: false}, // Fecha en la que se aprueba o fecha en la que se envia el formulario????
    // el required de la fecha es false en caso de que esta fecha se genere cuando se aprueba la solicitud.
    NombreDelActivo: {type: String, required: true, unique: false},// en el controler se obtiene mediante el id del activo
    // OJO! las dos de ubicacion son la unidad en la que estan, no los codigos, para los reportes se haria pool de los datos que se necesiten mediante la unidad.
    UnidadPrevioAlEnvio: {type: String, required: true, unique: false}, //  en el controler se obtiene mediante el id del activo
    UnidadPosteriorAlEnvio: {type: String, required: true, unique: false}, // se pide en el form
    EstadoDelActivo: {type: String, required: true, unique: false}, // Es un select en el controller
    MotivoDeTransferencia: {type: String, required: true, unique: false}, 
    IdDelSolicitante: {type: String, required: false, unique: false},// no es unico porque puede haber mas de una solicitud de parte del mismo usuario, no es required
    //porque si es jefatura este dato no se necesita, se aprueba de inmediato.
    EstadoDeAprobacion: {type: Number, required: true, unique: false},// en controller, si es jefatura va a ser igual a 1, si es encargado iguala 0, esto permitira
    // verificar si debe de ir a solicitud de aprobacion o si debe ir directo a reportes
    Imagen1: {type: String, required: false, unique: false},
    Imagen2: {type: String, required: false, unique: false}
});



module.exports = mongoose.model('Traslado', schemaTraslado, 'Traslados');