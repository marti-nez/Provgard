'use strict';

// Botones
const btnRegistrarForm = document.querySelector('#btnRegistrarForm');

// Pantalla principal de usuarios y de registrar usuarios
const registrarUsuarioForm = document.querySelector('#registrarUsuarioForm');
const btnRegistrar = document.querySelector('#btnRegistrar');
const lista = document.querySelector('#lista');
const rol = document.getElementById('slctRol');
const nombre = document.getElementById('txtNombre');
const primerApellido = document.getElementById('txtPrimerApellido');
const segundoApellido = document.getElementById('txtSegundoApellido');
const tipoIdentificacion = document.getElementById('slctTipoIdentificacion');
const correo = document.getElementById('txtCorreo');
const dateNacimiento = document.getElementById('dateNacimiento');
const numTelefono = document.getElementById('numTelefono');
const numIdentificacion = document.getElementById('numIdentificacion');
const slctUnidad = document.getElementById("slctUnidad*");

// Funcion para validar inputs
const Validar = () => {
    let formRegistro = document.querySelectorAll('#formRegistro [required]');

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

    //numero de identificacion no puede ser negativo

    if (numIdentificacion.value < 0) {
        Alerta('error', 'El numero de identificación no debe ser negativo');

        numIdentificacion.classList.add('inputError');

            setTimeout(() => {
                numIdentificacion.classList.remove('inputError');
            }, 3000);

            return false;
    }
    //correo electronico debe tener al menos un @
    // numero de telefono no puede ser negativo ni tener mas de 8 digitos

    if (numTelefono.value < 0 || numTelefono.value > 99999999) {
        Alerta('error', 'Numero de telefono incorrecto');

        numTelefono.classList.add('inputError');

            setTimeout(() => {
                numTelefono.classList.remove('inputError');
            }, 3000);

            return false;
    }
    //fecha nacimiento no puede ser despues del dia actual

    if (new Date (dateNacimiento.value) > new Date()) {
        Alerta('error', 'La fecha de nacimiento debe ser anterior a la fecha actual');

        dateNacimiento.classList.add('inputError');

            setTimeout(() => {
                dateNacimiento.classList.remove('inputError');
            }, 3000);

            return false;
    }

    // correo debe de llevar un @ y terminar en .com

    var regexCorreo = /@.*\.com$/;
    if (regexCorreo.test(correo.value) == false) {

        Alerta('error', 'Por favor verifica tu correo electronico');

        txtCorreo.classList.add('inputError');

            setTimeout(() => {
                txtCorreo.classList.remove('inputError');
            }, 3000);

            return false;
    }

    Alerta('success', 'Se registró con éxito');

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

const RegistrarUsuario = () => {

    if (Validar() == false) {
        return;
    }

    let fechaConFormato = new Date(dateNacimiento.value);

    const data = {
        'Nombre': nombre.value,
        'PrimerApellido': primerApellido.value,
        'SegundoApellido': segundoApellido.value,
        'TipoIdentificacion': tipoIdentificacion.value,
        'NumeroIdentificacion': numIdentificacion.value,
        'Correo': correo.value,
        'NumeroTelefono': numTelefono.value,
        'Unidad': slctUnidad.value,
        'DateNacimiento': `${fechaConFormato.getFullYear()}-${fechaConFormato.toLocaleString('default', {month: '2-digit'})}-${fechaConFormato.toLocaleString('default', {day: '2-digit'})}`,
        'Estado': 1,
        'Rol': rol.value,
        'Pw': GenerarContrasegnaAleatoria()
    };

    RegistrarUsuarioGest(data);

    setTimeout(() => {
        window.location = '../HTML/Home.html'
    }, 3000);
}

const AgregarOptsSelect = async() => {
    let result = await ProcessGet('ListarUnidades');

    for (let unidad of result.listaUnidades){
        let opt = document.createElement('option');
        opt.value = unidad.ID;
        opt.innerHTML = unidad.Nombre;
        slctUnidad.appendChild(opt);
    }
};

AgregarOptsSelect();

const ToggleUsuarios = () => {
    lista.classList.add('ocultar');
    registrarUsuarioForm.classList.remove('ocultar');

};

btnRegistrarForm.addEventListener('click', RegistrarUsuario);
btnRegistrar.addEventListener('click', ToggleUsuarios);