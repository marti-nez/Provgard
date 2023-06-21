'use strict';

const express = require('express');
const router = express.Router();
const Activo = require('../Models/ActivoModel');


router.post('/RegistrarActivo', (req, res) => {// instancia de express, post es el metodo http, path, handler (funcion a ejecutar)
    let body = req.body;// con base en el modelo yo uso post para crear nuevas instancias de ese modelo
    let nuevoActivo = new Activo({
        IDActivo: body.IDActivo,// body es un objeto que ya viene al utilizar.post
        Nombre: body.Nombre,
        Codigo: body.Codigo,
        UbicacionCodigo: body.UbicacionCodigo,
        UbicacionDentroDeLaUnidad: body.UbicacionDentroDeLaUnidad,
        Unidad: body.Unidad,
        Descripcion: body.Descripcion,
        EstadoDeAprobacion: body.EstadoDeAprobacion,
        IdDelSolicitante: body.IdDelSolicitante,
        FechaDeCreacion: body.FechaDeCreacion
    });
    nuevoActivo.save((err, activoDB) => {// de esta forma la indico a mongo db que guarde esta nueva instancia
        if (err) {// mongo va a generar automaticamente un id
            res.json({
                resultado: false,
                msj: 'No se pudo registrar el activo, ocurrio el siguiente error: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta ',
                activoDB// esto ultimo solo me devuelve lo que ya esta guardado
            });
        }
    });
});

// el siguiente get es el que serviria para que el controller traiga todos los objetos a listar en la lista de activos o de solicitudes pendientes
router.get('/ListarActivo', (req, res) => {
    Activo.find((err, ListaActivosDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener la lista de activos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta ',
                ListaActivosDB
            });
        }
    });
});

// A partir de aqui son los get para utilizar en los filtros (ID, Nombre, Ubicacion, Unidad)

router.get('/BuscarActivoPorId', (req, res) =>{
    let params = req.query;// aqui estoy extrayendo de la url los elementos del request que realicé, es el equivalente al body
    Activo.findOne({IDActivo : params.IDActivo}, (err, ActivoDB) => {
        if (err) {// yo le digo, del modelo persona ve a traerme la identificacion que sea igual a la solicitada en params
            res.json({
                resultado: false,
                msj: 'No se pudo obtener el Activo',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'El Activo se obtuvo de manera correcta ',
                ActivoDB
            });
        }
    });
});

router.get('/BuscarActivoPor_Id', (req, res) =>{
    let params = req.query;// aqui estoy extrayendo de la url los elementos del request que realicé, es el equivalente al body
    Activo.findOne({_id : params._id}, (err, ActivoDB) => {
        if (err) {// yo le digo, del modelo persona ve a traerme la identificacion que sea igual a la solicitada en params
            res.json({
                resultado: false,
                msj: 'No se pudo obtener el Activo',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'El Activo se obtuvo de manera correcta ',
                ActivoDB
            });
        }
    });
});

router.get('/BuscarActivoPorNombre', (req, res) => {
    let params = req.query;
    Activo.findOne({ Nombre: params.Nombre }, (err, ActivoDB) => {
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
                ActivoDB
            });
        }
    });
});

router.get('/BuscarActivoPorUbicacionCodigo', (req, res) => {
    let params = req.query;
    Activo.findOne({ UbicacionCodigo: params.UbicacionCodigo }, (err, ActivoDB) => {
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
                ActivoDB
            });
        }
    });
});

router.get('/BuscarActivoPorUnidad', (req, res) => {
    let params = req.query;
    Activo.findOne({ Unidad: params.Unidad }, (err, ActivoDB) => {
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
                ActivoDB
            });
        }
    });
});
// aqui terminan los route de filtros//

router.put('/ModificarActivo', function (req, res){ // requiere el id del activo
    let body =  req.body;
    Activo.updateOne({ IDActivo: body.IDActivo }, {
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
router.delete('/EliminarActivo', function (req, res) {
    let body = req.body;
    Activo.remove({ IDActivo: body.IDActivo }, (err, result) => {
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