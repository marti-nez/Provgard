'use strict';

const express = require('express');
const router = express.Router();
const Unidad = require('../Models/UnidadModel');

// Permite registrar una nueva unidad
router.post('/RegistrarUnidad', (req, res) => {
    let body = req.body;

    let nuevaUnidad = new Unidad({
        Nombre: body.Nombre,
        Descripcion: body.Descripcion,
        Provincia: body.Provincia,
        Canton: body.Canton,
        Distrito: body.Distrito,
        Segnas: body.Segnas,
        Estado: body.Estado,
        ID: body.ID
    });

    nuevaUnidad.save((err, unidadDB) => {
        if (err) {
            res.json({
                result: false,
                msj: `Ocurrió un error ${err}`
            });
        } else {
            res.json({
                result: true,
                msj: 'Success',
                unidadDB
            });
        }
    })
});

// Permite listar todas las unidades en la base de datos
router.get('/ListarUnidades', (req, res) => {

    Unidad.find((err, listaUnidades) => {
        if (err) {
            res.json({
                result: false,
                msj: `Un error ha ocurrido ${err}`
            });
        } else {
            res.json({
                result: true,
                msj: 'Success',
                listaUnidades
            });
        }
    })
});

// Permite modificar las unidades de la base de datos. Permite modificar todos los atributos de dicha unidad
router.put('/ModificarUnidades', (req, res) => {
    let body = req.body;

    Unidad.updateOne({_id:body._id}, {
        $set: body, // al dejarlo en req.body actualiza todo el usuario, contrario a si se establecen valores dentro del set
    }, (err, info) => {
        if (err) {
            res.json({
                result: false,
                msj: `Ocurrió un error ${err}`
            });
        } else {
            res.json({
                result: true,
                msj: 'Se actualizó con éxito',
                info
            });
        }
    });
});

// Permite modificar únicamente el estado de una unidad.
router.put('/EstadoUnidad', (req, res) => {
    let body = req.body;

    Unidad.updateOne({_id:body._id}, {
        $set: {
            Estado: body.Estado
        }
    }, (err, info) => {
        if (err) {
            res.json({
                result: false,
                msj: `No se pudo actualizar el estado del unidad ${err}`
            });
        } else {
            res.json({
                result:true,
                msj: 'Se actualizó con éxito',
                info
            });
        }
    });
});

// Permite eliminar una unidad recibiendo como parámetro el _id
router.delete('/EliminarUnidad', (req, res) => {

    let body = req.body;

    Unidad.remove({_id: body._id}, (err, info) => {
        if (err) {
            res.json({
                result: false,
                msj: `No se pudo eliminar la unidad ${err}`
            });
        } else {
            res.json({
                result: true,
                msj: 'Se eliminó con éxito',
                info
            });
        }
    });
});

// Buscar una unidad por su _id
router.get('/ObtenerUnidadId', (req, res) => {
    let params = req.query;

    Unidad.findOne({_id: params._id}, (err, unidadDB) => {
        if (err) {
            res.json({
                result: false,
                msj: `Un error ha ocurrido ${err}`
            });
        } else {
            res.json({
                result: true,
                msj: 'Success',
                unidadDB
            });
        }
    });
});

router.get('/ObtenerUnidadIdentificador', (req, res) => {
    let params = req.query;

    Unidad.findOne({ID: params.ID}, (err, unidadDB) => {
        if (err) {
            res.json({
                result: false,
                msj: `Un error ha ocurrido ${err}`
            });
        } else {
            res.json({
                result: true,
                msj: 'Success',
                unidadDB
            });
        }
    });
});

module.exports = router;