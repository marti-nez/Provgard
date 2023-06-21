'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../Models/UsuarioModel');
const enviarMail = require('..//Templates/contrasegnaTemporal.js');

// Permite registrar usuarios.
router.post('/RegistrarUsuario', (req, res) => {
    let body = req.body;
    let nuevoUsuario = new Usuario({
        Nombre: body.Nombre,
        PrimerApellido: body.PrimerApellido,
        SegundoApellido: body.SegundoApellido,
        TipoIdentificacion: body.TipoIdentificacion,
        NumeroIdentificacion: body.NumeroIdentificacion,
        Correo: body.Correo,
        NumeroTelefono: body.NumeroTelefono,
        DateNacimiento: body.DateNacimiento,
        Unidad: body.Unidad,
        FotoPerfil: body.FotoPerfil,
        Rol: body.Rol,
        Estado: body.Estado,
        Pw: body.Pw
    });

    nuevoUsuario.save((err, usuarioDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: `No se pudo registrar la unidad, error ${err}`
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado con exito ',
                usuarioDB
            });
        };
    });
});

//Permite validar correo y contraseña de un usuario para ser autenticado.
router.get('/Autenticar', (req, res) => {
    let params = req.query;

    Usuario.findOne({Correo: params.Correo, Pw: params.Pw}, (err, usuarioDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: `No se pudo autenticar ${err}`
            });

        } else {
            res.json({
                resultado: true,
                msj: 'Exito',
                usuarioDB
            });
        }
    });
});

// Lista todos los usuarios de la base de datos. Incluidos activos, inactivos y pendientes de aprobación
router.get('/ListarUsuarios', (req, res) => {

    Usuario.find((err, listaUsuariosDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: `No se pudieron obtener los usuarios ${err}`
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Lista de usuarios obtenidos con éxito',
                listaUsuariosDB
            });
        }
    });
});

// Genera una lista de los usuarios cuyo atributo "Estado" corresponde a 0. Usuarios que tienen pendiente su registro.
router.get('/ListarUsuariosPorAprobar', (req, res) => {

    Usuario.find({Estado: 0}, (err, listaUsuariosDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: `No se pudieron obtener los usuarios ${err}`
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Lista de usuarios obtenidos con éxito',
                listaUsuariosDB
            });
        }
    });
});

// Permite la edición de todos los atributos de un usuario
router.put('/EditarUsuario' , (req, res) => {
    let body = req.body;

    Usuario.updateOne({_id:body._id}, {
        $set: req.body, // al dejarlo en req.body actualiza todo el usuario, contrario a si se establecen valores dentro del set
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

// Permite editar el Estado y Rol de un usuario
router.put('/EstadoUsuario', (req, res) => {
    let body = req.body;

    Usuario.updateOne({_id:body._id}, {
        $set: {
            Estado: body.Estado,
            Rol: body.Rol
        }
    }, (err, info) => {
        if (err) {
            res.json({
                result: false,
                msj: `No se pudo actualizar el estado del usuario ${err}`
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

router.put('/AprobarUsuario', (req, res) => {
    let body = req.body;

    Usuario.updateOne({_id:body._id}, {
        $set: {
            Estado: 1,
            Rol: body.Rol
        }
    }, (err, info) => {
        if (err) {
            res.json({
                result: false,
                msj: `No se pudo actualizar el estado del usuario ${err}`
            });
        } else {
            res.json({
                result:true,
                msj: 'Se actualizó con éxito',
                info
            });

            enviarMail.enviar_mail(info);
        }
    });
});

// Permite eliminar usuarios.
router.delete('/EliminarUsuario', (req, res) => {

    let body = req.body;

    Usuario.remove({_id: body._id}, (err, info) => {
        if (err) {
            res.json({
                result: false,
                msj: `No se pudo eliminar el usuario ${err}`
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

// Query de un usuario usando el atributo de _id
router.get('/ObtenerUsuarioId', (req, res) => {
    let params = req.query;

    Usuario.findOne({_id: params._id}, (err, usuarioDB) => {
        if (err) {
            res.json({
                result: false,
                msj: `Un error ha ocurrido ${err}`
            });
        } else {
            res.json({
                result: true,
                msj: 'Success',
                usuarioDB
            });
        }
    });
});

module.exports = router;