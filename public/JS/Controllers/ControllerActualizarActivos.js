'use strict';

const registrarActivoForm = document.querySelector('#registrarActivoForm');

let usuarioActual = ObtenerSesionActiva();

const Validar = () => {
    let formRegistro = document.querySelectorAll('#formRegistro [required]');
    console.log(formRegistro)
    let selectUnidad = document.getElementById('slctUnidad');
    console.log(selectUnidad)
    // Los inputs requeridos no deben estar vacíos
    for (let input of formRegistro) {

        let temp = input.value;
        if (temp == '' || temp == null || temp == undefined) {
            Alerta('error', 'Por favor llene todos los espacios requeridos');

            input.classList.add('inputError');

            setTimeout(() => {
                input.classList.remove('inputError');
            }, 3000);

            return false;
        }

    }

    if (selectUnidad.value == '' || selectUnidad.value == null || selectUnidad.value == undefined) {

        Alerta('error', 'Por favor llene todos los espacios requeridos');

        selectUnidad.classList.add('inputError');

        setTimeout(() => {
            selectUnidad.classList.remove('inputError');
        }, 3000);

        return false;
    }
    // obteniendo los datos para el post, mas codigo pero mas facil de usar :p



    async function HacerPost(){
        let nombreForm = document.getElementById("txtNombre").value;
        let detallesForm = document.getElementById("txtDetalles").value;
        let unidadForm =  document.getElementById("slctUnidad").value;
        let ubicacionDentroDeLaUnidad = document.getElementById("txtubicacionUnidad").value;
        let rolDeaprobacion = 0
        if (usuarioActual.Rol == 1 || 2) {
            rolDeaprobacion = 1
        }
        // let data = {
        //     "ID" : unidadForm.value
        // }
        // let unidadData =  await ProcessGet("ObtenerUnidadId", data);
        // let unidadAUsar = unidadData.Nombre
        ActivoPost(nombreForm, detallesForm,"Heredia", ubicacionDentroDeLaUnidad, usuarioActual.NumeroIdentificacion, Fecha(), rolDeaprobacion  )
    }

    HacerPost()
    BitacoraPost("Registro de nuevo activo", Fecha(), usuarioActual.Nombre,usuarioActual.NumeroIdentificacion, usuarioActual.Unidad )
    //ActivoPost(usuarioActual.nombre,)
    Alerta('success', 'Se registró con éxito');
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


const RegistrarActivo = () => {

    if (!Validar()) {
        return;
    }

    console.log('Exito'); //texto generico de prueba
}


async function HacerGetActualizarActivos(ID) {
    window.location.href = '/public/HTML/prueba.html'
    let objetoActualizar = {
        "IDActivo": ID
    }
    let getDeActivo = ProcessGet(BuscarActivoPorId, objetoActualizar)
    let datosDeActivo = getDeActivo.ActivoDB;
}


btnRegistrarForm.addEventListener('click', RegistrarActivo);
