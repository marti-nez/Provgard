'use strict';

// Boton
const btnRegistrar = document.querySelector('#btnRegistrarForm');
const formRegistroInt = document.querySelectorAll('#formRegistro');

const nombre = document.getElementById('txtNombre');
const primerApellido = document.getElementById('txtPrimerApellido');
const segundoApellido = document.getElementById('txtSegundoApellido');
const tipoIdentificacion = document.getElementById('slctTipoIdentificacion');
const numIdentificacion = document.getElementById('numIdentificacion');
const correo = document.getElementById('txtCorreo');
const numTelefono = document.getElementById('numTelefono');
const dateNacimiento = document.getElementById('dateNacimiento');
const slctUnidad = document.getElementById("slctUnidad");
const FotoPerfil = document.getElementById("imgMostrar");


const Registrar = async () => {

    if (!Validar()) {
        return;
    }

    let fechaConFormato = new Date(dateNacimiento.value);

    const data = { //hace falta la unidad
        'Nombre': nombre.value,
        'PrimerApellido': primerApellido.value,
        'SegundoApellido': segundoApellido.value,
        'TipoIdentificacion': tipoIdentificacion.value,
        'NumeroIdentificacion': numIdentificacion.value,
        'Correo': correo.value,
        'NumeroTelefono': numTelefono.value,
        'Unidad': slctUnidad.value,
        'DateNacimiento': `${fechaConFormato.getFullYear()}-${fechaConFormato.toLocaleString('default', {month: '2-digit'})}-${fechaConFormato.toLocaleString('default', {day: '2-digit'})}`,
        'FotoPerfil': FotoPerfil.src,
        'Estado': 0,
        'Pw': GenerarContrasegnaAleatoria()
    };

    let result = await ProcessPost('RegistrarUsuario', data); //realiza la petición de registro de usuario

    if (result == null || result.usuarioDB == null || result == undefined) {
        Alerta('error', 'Ocurrio un error realizando el registro, por favor revise');
        return;
    }

    Alerta('success', 'Su solicitud de registro se realizó con exito');

    setTimeout(() => {
        window.location.href = "/public/HTML/IniciarSesion.html";
    }, 3000);
};

const GenerarContrasegnaAleatoria = () => {
    let result = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%*';
    const len = caracteres.length; // consigue la cantidad de caracteres que  tiene el string anterior

    for (let i = 0; i < 10; i++) { // se parametriza i < 10 porque se desea que la contraseña posea 10 caracteres
        result += caracteres[Math.floor(Math.random() * len)]; // Math random () * len obtiene un número al azar entre 0 y el largo de
                                                               // caracteres de la variable len. Math floor redondea ese valor para que
                                                               // sea un valor entero. 
                                                               // caracteres[numero] obtiene el caracter que se encuentra en el índice numero
    }

    return result;
};

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

    let numTelefono = document.getElementById('numTelefono');

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

    return true;
};

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

btnRegistrar.addEventListener('click', Registrar);