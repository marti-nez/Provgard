'use strict';
const sesionActual = ObtenerSesionActiva();
const imgMostrar = document.getElementById("imgMostrar");
const txtIdentificacion = document.getElementById("txtIdentificacion");
const txtNombre = document.getElementById("txtNombre");
const txtPrimerApellido = document.getElementById("txtPrimerApellido");
const txtSegundoApellido = document.getElementById("txtSegundoApellido");
const txtTelefono = document.getElementById("txtTelefono");
const txtCorreo = document.getElementById("txtCorreo");
const txtFechaNac = document.getElementById("txtFechaNac");
const txtUnidad = document.getElementById("txtUnidad");
const rol = document.getElementById("rol");



const ImprimirImagen = () => {
    imgMostrar.src = sesionActual.FotoPerfil;
    txtIdentificacion.value = sesionActual.NumeroIdentificacion;
    txtNombre.value = sesionActual.Nombre;
    txtPrimerApellido.value = sesionActual.PrimerApellido;
    txtSegundoApellido.value = sesionActual.SegundoApellido;
    txtTelefono.value = sesionActual.NumeroTelefono;
    txtCorreo.value = sesionActual.Correo;
    txtFechaNac.value = sesionActual.DateNacimiento;
    txtUnidad.value = sesionActual.Unidad;
    rol.value = sesionActual.Rol;
};

const AgregarOptsSelect = async() => {
    let result = await ProcessGet('ListarUnidades');

    for (let unidad of result.listaUnidades){
        let opt = document.createElement('option');
        opt.value = unidad.ID;
        opt.innerHTML = unidad.Nombre;
        // slctUnidad.appendChild(opt);
        txtUnidad.appendChild(opt);
    }

};
AgregarOptsSelect();
ImprimirImagen();

const TransformarRol = (num) => {
    switch (num) {
        case 1:
            return "Jefatura";
        case 2:
            return "Proveeduría";
        case 3:
            return "Encargado de unidad";
        default:
            return "Sin rol";
    }
};



// let fileInput = document.getElementById('file-input');
//     let imgActivo = document.getElementById('imgActivo');
//     console.log(fileInput.files)
//     if (!fileInput.files || fileInput.files.length < 2) {
//         Alerta('error', 'Por favor adjunte al menos dos imagenes del activo');

//         imgActivo.classList.add('inputError');

//             setTimeout(() => {
//                 imgActivo.classList.remove('inputError');
//             }, 3000);

//             return false;
//     }

