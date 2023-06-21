'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/Public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MDS, Content-Type, Date, X-Api-Version, X-Response-Time, XPINGOTHER, X-CSRF-Token, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// declarar la variable db (que almacena la instancia de la base de datos para ser reutilizada en el callback)
let db;

// Se conecta la base de datos previo a levantar el servidor (usando el .env)
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err, database) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Guarda objeto para que sea reutilizado por el callback
    db = database;
    console.log('Se establecio la conexion con la base de datos');

    const server = app.listen(process.env.PORT || 8000, () => {
        let port = server.address().port;
        console.log(`La aplicacion se levanto en el puerto ${port}`);
    })
});

const HandleError = (res, reason, message, code) => {
    console.log(`ERROR: ${reason}`);
    res.status(code || 500).json({"error": message});
};

// conexion a todas las rutas del backend

const usuarios = require('./Routes/UsuarioRoute');
app.use('/api', usuarios);

const activos = require('./Routes/ActivoRoute');
app.use('/api', activos);

const traslados = require('./Routes/TrasladoRoute');
app.use('/api', traslados);

const unidades = require('./Routes/UnidadRoute');
app.use('/api', unidades);

const bitacora = require('./Routes/BitacoraRoute');
app.use('/api', bitacora);