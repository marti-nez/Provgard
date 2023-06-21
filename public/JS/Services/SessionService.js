'use strict';

const ActivarSesion = (usuario) => {

    let usuarioStringify = JSON.stringify(usuario);
    localStorage.setItem('DatosSesionActiva', usuarioStringify);
};

const LimpiarSesionActiva = () => {
    localStorage.removeItem('DatosSesionActiva');
};

const ObtenerSesionActiva = () => {
    let datosSesionActiva = null;
    let localStorageData = localStorage.getItem('DatosSesionActiva');

    if (localStorageData != null && localStorageData != undefined && localStorageData != ''){
        datosSesionActiva = JSON.parse(localStorageData);
    }

    return datosSesionActiva;
};