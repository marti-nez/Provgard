'use strict';

const express = require('express');
const router = express.Router();
const Traslado = require('../Models/TrasladoModel');


router.post('/SolicitarTraslado', (req, res) => {// instancia de express, post es el metodo http, path, handler (funcion a ejecutar)
    let body = req.body;// con base en el modelo yo uso post para crear nuevas instancias de ese modelo
    let nuevoTraslado = new Traslado({
        IdDelActivo: body.IdDelActivo,
        IdDelTraslado: body.IdDelTraslado,
        FechaDeTraslado: body.FechaDeTraslado,
        NombreDelActivo: body.NombreDelActivo,
        UnidadPrevioAlEnvio: body.UnidadPrevioAlEnvio,
        UnidadPosteriorAlEnvio: body.UnidadPosteriorAlEnvio,
        EstadoDelActivo: body.EstadoDelActivo,
        MotivoDeTransferencia: body.MotivoDeTransferencia,
        IdDelSolicitante: body.IdDelSolicitante,
        EstadoDeAprobacion: body.EstadoDeAprobacion
    });
    nuevoTraslado.save((err, trasladoDB) => {// de esta forma la indico a mongo db que guarde esta nueva instancia
        if (err) {// mongo va a generar automaticamente un id
            res.json({
                resultado: false,
                msj: 'No se pudo solicitar el traslado, ocurrio el siguiente error: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta ',
                trasladoDB// esto ultimo solo me devuelve lo que ya esta guardado
            });
        }
    });
});

// el siguiente get es el que serviria para que el controller traiga todos los objetos a listar en la lista de activos o de solicitudes pendientes
router.get('/ListarTraslado', (req, res) => {
    Traslado.find((err, ListaTrasladosDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener la lista de traslados: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta ',
                ListaTrasladosDB
            });
        }
    });
});

// A partir de aqui son los get para utilizar ne los filtros (ID del traslado, id del activo, ubicacion actual, ubicacion anterior, fecha de traslado)

router.get('/BuscarTrasladoPorId', (req, res) =>{
    let params = req.query;// aqui estoy extrayendo de la url los elementos del request que realicé, es el equivalente al body
    Traslado.findOne({IdDelTraslado : params.IdDelTraslado}, (err, TrasladoDB) => {
        if (err) {// yo le digo, del modelo persona ve a traerme la identificacion que sea igual a la solicitada en params
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos del Traslado',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'El Traslado se obtuvo de manera correcta ',
                TrasladoDB
            });
        }
    });
});

router.get('/BuscarTrasladoPorActivoId', (req, res) =>{
    let params = req.query;// aqui estoy extrayendo de la url los elementos del request que realicé, es el equivalente al body
    Traslado.findOne({IDActivo : params.IDActivo}, (err, TrasladoDB) => {
        if (err) {// yo le digo, del modelo persona ve a traerme la identificacion que sea igual a la solicitada en params
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos del Traslado',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'El Traslado se obtuvo de manera correcta ',
                TrasladoDB
            });
        }
    });
});
router.get('/BuscarTrasladoPorUbicacionActual', (req, res) => {
    let params = req.query;
    Traslado.findOne({ UnidadPosteriorAlEnvio: params.UnidadPosteriorAlEnvio }, (err, TrasladoDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener el nombre solicitado',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta',
                TrasladoDB
            });
        }
    });
});

router.get('/BuscarTrasladoPorUbicacionAnterior', (req, res) => {
    let params = req.query;
    Traslado.findOne({ UnidadPrevioAlEnvio: params.UnidadPrevioAlEnvio }, (err, TrasladoDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener el nombre solicitado',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta',
                TrasladoDB
            });
        }
    });
});

router.get('/BuscarPorFechaDeTraslado', (req, res) => {
    let params = req.query;
    Traslado.findOne({ FechaDeTraslado: params.FechaDeTraslado }, (err, TrasladoDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener el dato solicitado',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta',
                TrasladoDB
            });
        }
    });
});

// aqui terminan los route de filtros//

router.put('/ModificarTraslado', function (req, res){ // requiere el id del Traslado
    let body =  req.body;
    Traslado.updateOne({ IdDelTraslado: body.IdDelTraslado }, {
        $set: req.body // reservado de mongo, va y actualiza los parametros que hagan match con mi modelo
        // $set:{
        //     Nombre: body.Nombre,
        //     Edad: body.Edad // este set permite enviarle un objeto para que acualice unicamente datos especificos
        // }
    }, function (err, info){
        if (err) {
            res.json({
                resultado: false,
                msj: 'Ocurrio un error y no se pudieron actualizar los datos.',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se actualizaron de manera correcta',
                info
            });
        }
    });
});
router.delete('/EliminarTraslado', function (req, res) {
    let body = req.body;
    Traslado.remove({ IdDelTraslado: body.IdDelTraslado }, (err, result) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo eliminar los datos',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se eliminaron de manera correcta',
                result
            });
        }
    });
});


module.exports = router; // siempre debo de exportar este modulo de codigo para que pueda ser utilizado por la app en otro lado