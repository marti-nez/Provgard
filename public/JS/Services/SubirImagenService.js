'use strict';

// const botonSubirFoto = document.querySelector('#btnSubirFoto');
let imagen = document.getElementById('imgMostrar');;

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: 'murtzdevilopers',
    uploadPreset: 'devilopers'
}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con éxito', result.info);
        imagen.src = result.info.secure_url;
    }
});

// botonSubirFoto.addEventListener('click', () => {
//     widget_cloudinary.open();
// }, false);

const AbrirCloudinary = (inputImagen) => {
    imagen = document.getElementById(inputImagen);
    widget_cloudinary.open();
};

// <script src="https://widget.cloudinary.com/v2.0/global/all.js></script>"