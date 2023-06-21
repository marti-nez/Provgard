'use strict';

// Botones
const btnLogIn = document.querySelector('#btnLogIn');

// Inputs

const inptEmail = document.getElementById('emailLogIn');
const inptPwd = document.getElementById('pwdLogIn');

const IniciarSesion = async () => {

    let email = inptEmail.value;
    let pwd = inptPwd.value;

    if (!Validar()){
        return;
    }

    let params = {
        'Correo': email,
        'Pw': pwd
    };

    let result = await ProcessGet('Autenticar', params);

    if (result != null && result.usuarioDB != null && result != undefined) {
        if (result.usuarioDB.Estado == 0) {
            Alerta('error', 'Su registro no ha sido aprobado, aún no puede iniciar sesión');
            return;
        }

        if (result.usuarioDB.Estado == -1) {
            Alerta('error', 'Su cuenta se encuentra inactiva');
            return;
        }
        location.href = 'Home.html'; //podria ser replace
        ActivarSesion(result.usuarioDB)
    } else {
        Alerta('error', 'Correo o contraseña equivocados');
    }

};

const Validar = () => {

    let formLogIn = document.querySelectorAll('#formLogIn [required]');

    // Los inputs requeridos no deben estar vacíos
    for (let input of formLogIn) {
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

const InputInvalido = (idInput) => {
    let input = document.getElementById(idInput);
    let estiloOriginal = input.style;

    input.style = 'border: 1px solid #D70040;';

    setTimeout(() => {
        elementLabel.style = estiloOriginal;
    }, 5000);
};

btnLogIn.addEventListener('click', IniciarSesion);