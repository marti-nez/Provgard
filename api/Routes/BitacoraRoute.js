'use strict';

const express = require('express');
const router = express.Router();
const Bitacora = require('../Models/BitacoraModel');


router.post('/RegistrarBitacora', (req, res) => {// instancia de express, post es el metodo http, path, handler (funcion a ejecutar)
    let body = req.body;// con base en el modelo yo uso post para crear nuevas instancias de ese modelo
    let nuevaBitacora = new Bitacora({
        TipoDeMovimiento: body.TipoDeMovimiento,// body es un objeto que ya viene al utilizar.post
        Fecha: body.Fecha,
        NombreDelUsuario: body.NombreDelUsuario,
        UsuarioId: body.UsuarioId,
        Unidad: body.Unidad
    });
    nuevaBitacora.save((err, bitacoraDB) => {// de esta forma la indico a mongo db que guarde esta nueva instancia
        if (err) {// mongo va a generar automaticamente un id
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la bitacora, ocurrio el siguiente error: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta ',
                bitacoraDB// esto ultimo solo me devuelve lo que ya esta guardado
            });
        }
    });
});

router.get('/ListarBitacora', (req, res) => {
    Bitacora.find((err, ListaBitacoraDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener la lista, ocurrio el siguiente error: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta ',
                ListaBitacoraDB
            });
        }
    });
});

module.exports = router;