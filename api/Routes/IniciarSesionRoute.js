// 'use strict';

// const express = require('express');
// const router = express.Router();
// const Usuario = require('../Models/UsuarioModel');

// router.get('/Autenticar', (req, res) => {

//     let params = req.query;

//     Usuario.findOne({Correo: params.Correo, Pw: params.Pw}, (err, info) => {
//         if (err) {
//             res.json({
//                 resultado: false,
//                 msj: `No se pudo autenticar, error ${err}`
//             });
//         } else {
//             res.json({
//                 resultado: true,
//                 msj: 'Registro realizado con exito ',
//                 info
//             })
//         };
//     });
// });