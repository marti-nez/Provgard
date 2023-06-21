'use strict';

// Botones
const btnRegistrarForm = document.querySelector('#btnRegistrarForm');

// Inputs

const nombre = document.getElementById('txtNombre');
const descripcion = document.getElementById('txtDescripcion');
const provincia = document.getElementById('slctProvincia');
const distrito = document.getElementById('slctDistrito');
const canton = document.getElementById('slctCanton');
const segnas = document.getElementById('segnasDireccion');

// Pantalla principal de usuarios y de registrar usuarios
const registrarUnidadForm = document.querySelector('#registrarUnidadForm');

// Variable temporales usadas para ilustrar en Frontend


// Funcion para validar inputs
const Validar = () => {

    let formRegistro = document.querySelectorAll('#formRegistro [required]');

    // Los inputs requeridos no deben estar vacíos
    for (let input of formRegistro) {
        let temp = input.value;
        if (temp == '' || temp == null || temp == undefined) {
            Alerta('error', 'Por favor llene todos los espacios requeridos');

            //resalta de rojo el input invalido
            input.classList.add('inputError');

            setTimeout(() => {
                input.classList.remove('inputError');
            }, 3000);

            return false;
        }
    }

    return true;
};

// Funcion para mostrar alerta
const Alerta = (tipo, mensaje) => {
    Swal.fire({
        icon: tipo,
        title: mensaje,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#7F167F'
      });
};

// Funcion que cambia el color del borde de un input no valido

const InputInvalido = (idInput) => {
    let input = document.getElementById(idInput);
    let estiloOriginal = input.style;

    input.style = 'border: 1px solid #D70040;';

    setTimeout(() => {
        elementLabel.style = estiloOriginal;
    }, 5000);
}

// Funcion para registrar los usuarios

const RegistrarUnidad = async () => {

    if (!Validar()) {
        return;
    }

    let nuevoIDUd = await GenerarIDUnidad();

    let data = { // Corresponde a Process Post para ser registrado.
        'Nombre': nombre.value,
        'Descripcion': descripcion.value,
        'Provincia': provincia.value,
        'Canton': canton.value,
        'Distrito': distrito.value,
        'Segnas': segnas.value,
        'Estado':1,
        'ID': nuevoIDUd
    };

    let result = await ProcessPost('RegistrarUnidad', data);

    if (result == null || result.unidadDB == null || result == undefined) { // En caso de ocurrir un error en el registro despliega una alerta de error
        Alerta('error', 'Ocurrió un error realizando el registro, por favor revise');
        return;
    }

    let resultBitacora = await logBitacora(`Registrar unidad con ID ${nuevoIDUd}`);
    Alerta('success', 'La unidad fue registrada con éxito'); // Considerando que el if anterior tiene un return, si ese if no se cumple, la función sigue en ejecución y da alerta de success.

    setTimeout(() => {
        window.location = '../HTML/Home.html'
    }, 3000);
};

const logBitacora = async (tipoMovimiento) => {
    let sesionActiva = ObtenerSesionActiva();

    let dataBitacora = {
        'TipoDeMovimiento': tipoMovimiento,
        'Fecha': new Date(),
        'NombreDelUsuario': sesionActiva.Nombre,
        'UsuarioId': sesionActiva.NumeroIdentificacion,
        'Unidad': sesionActiva.Unidad
    };

    let resultBitacora = await ProcessPost('RegistrarBitacora', dataBitacora);
};

const GenerarIDUnidad = async () => {

    let listaUds = await ProcessGet('ListarUnidades'); // consulta de unidades con la base de datos
    listaUds = listaUds.listaUnidades;

    let nuevoId = await ObtenerIdMayor(listaUds) + 1; // Consecutivo al mayor ID

    nuevoId = nuevoId.toString(); // convierte el nuevoId que es tipo Number a causa de la funcion Obtener IdMayor y lo pasa a String.

    let cerosAgregar = 6 - nuevoId.length;

    let result = 'U';

    for(let i =0; i < cerosAgregar; i++) {
        result+= '0';
    }

    result += nuevoId;

    return result;
};

const ObtenerIdMayor = (arr) => {

    let result = [];

    if (arr ==[]){
        return -1;
    }
    // 'U000001'
    // for (let i = 0; i < arr.length; i++) {
    //     let idUsar = arr[i].ID.\substring(1);
    //     result.push(idUsar * 1);
    // }

    // result = arr.map(obj => (obj.ID.substring(1)) * 1);
    for ( let objeto of arr) {
        let idUsar = objeto.ID.substring(1);
        result.push(idUsar * 1); // al multiplicar por 1 convierte el str del objeto en Number
    }

    return Math.max(...result); // mete los elementos del arr como parametro de la bult in Math.max
};


btnRegistrarForm.addEventListener('click', RegistrarUnidad);