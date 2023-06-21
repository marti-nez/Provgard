'use strict';
let selectUnidad = document.getElementById('slctUnidad');
// Botones
const btnRegistrarForm = document.querySelector('#btnRegistrarForm');
const btnRegistrar = document.querySelector('#btnRegistrar');
const btnEliminar = document.querySelector('#btnEliminar');

// Pantalla principal de usuarios y de registrar usuarios
const lista = document.querySelector('#lista');
const registrarActivoForm = document.querySelector('#registrarActivoForm');

// Obtener elementos con las clases que los catalogan segun su rol

const noEncargadoUnidad = document.querySelectorAll('.noEncargadoUnidad');
// let usuarioActual = ObtenerSesionActiva();

//

// funciones para ocultar/mostrar pantallas
const MostrarForm = () => {
    lista.classList.remove('mostrar')
    lista.classList.add('ocultar');
    registrarActivoForm.classList.remove('ocultar');
    registrarActivoForm.classList.add('mostrar');
};

const OcultarForm = () => {
    registrarActivoForm.classList.remove('mostrar');
    registrarActivoForm.classList.add('ocultar');
    lista.classList.remove('ocultar');
    lista.classList.add('mostrar');
};

const AgregarOptsSelect = async() => {
    
    let result = await ProcessGet('ListarUnidades');
    
    for (let unidad of result.listaUnidades){
        let opt = document.createElement('option');
        opt.value = unidad.ID;
        opt.innerHTML = unidad.Nombre;
        selectUnidad.appendChild(opt);
    }
};

AgregarOptsSelect();

// Funcion para validar inputs
const Validar = () => {
    let formRegistro = document.querySelectorAll('#formRegistro [required]');
    console.log(formRegistro)
    
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



    if (usuarioActual.Rol == 3) {
        Alerta('success', 'Se envió la solicitud de registro de activo');

        setTimeout(() => {
            window.location = '../HTML/Home.html'
        }, 3000);
        HacerPost()
        BitacoraPost("Se realizó una solicitud de registro de activo", Fecha(), usuarioActual.Nombre,usuarioActual.NumeroIdentificacion, usuarioActual.Unidad )
        return true;
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
        console.log(nombreForm)
        let detallesForm = document.getElementById("txtDetalles").value;
        let unidadForm =  document.getElementById("slctUnidad").value;
        if (usuarioActual.Rol == 3) {
            unidadForm = usuarioActual.Unidad;
        }
        let ubicacionDentroDeLaUnidad = document.getElementById("txtubicacionUnidad").value;
        let rolDeaprobacion = 1
        if (usuarioActual.Rol == 3) {
            rolDeaprobacion = 0
        }

        await ActivoPost(nombreForm, detallesForm,unidadForm, ubicacionDentroDeLaUnidad, usuarioActual.NumeroIdentificacion, Fecha(), rolDeaprobacion  )
    }

    HacerPost()
    BitacoraPost("Registro de nuevo activo", Fecha(), usuarioActual.Nombre,usuarioActual.NumeroIdentificacion, usuarioActual.Unidad )
    //ActivoPost(usuarioActual.nombre,)
    Alerta('success', 'Se registró con éxito');
    OcultarForm();
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

const RegistrarActivo = () => {

    if (!Validar()) {
        return;
    }

    console.log('Exito'); //texto generico de prueba
}

// Funcion para eliminar usuario

const BtnEliminar = async () => {

    const { value: id } = await Swal.fire({
      title: 'Eliminar activo',
      input: 'number',
      inputLabel: 'Ingrese el numero de identificacion del activo',
      inputPlaceholder: '1234567',
      confirmButtonColor: '#7F167F'
    })

    if (id && usuarioActual.Rol != 3) {
        Alerta('success', `Activo ${id} ha sido eliminado`)
        return;
    }

    if (id && usuarioActual.Rol == 3) {
        Alerta('success', `La solicitud de eliminar activo ${id} ha sido realizada`)
    }

};

const Acceso = () => {

    if (usuarioActual.Rol == 3) {
        for (let elemento of noEncargadoUnidad) {
            elemento.classList.add('ocultar');
        }

        // registrarActivoForm.classList.add('mostrar');
        btnRegistrar.classList.add('ocultar');
    }
};


btnRegistrar.addEventListener('click', MostrarForm);
btnRegistrarForm.addEventListener('click', RegistrarActivo);
window.addEventListener('load', Acceso);