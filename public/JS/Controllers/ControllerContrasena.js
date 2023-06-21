"use strict"

const pw = document.getElementById("nuevaCont"); 
const confirmarPw = document.getElementById("confirCont");
const pwActual = document.getElementById("contAnt");
const usuarioActual = ObtenerSesionActiva();
const btnRegistrarCont = document.getElementById("btnRegistrarCont");

const Validar = async () => {
  
    let formPw = document.querySelectorAll('#formPw input[required]');

    // Los inputs requeridos no deben estar vacíos
    for (let input of formPw) {
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

  let pwActualBD = await ProcessGet('ObtenerUsuarioId', {'_id': usuarioActual._id});

  if (pwActualBD.usuarioDB.Pw != pwActual.value) {
    Alerta('error', 'La contraseña actual es incorrecta');
    pwActual.classList.add("inputError");
    setTimeout(() => {
      pwActual.classList.remove('inputError');
    }, 3000);

    return false;
  }

  if (pw.value != confirmarPw.value) {
    Alerta('error', 'Las contraseñas no coinciden');
    confirmarPw.classList.add("inputError");
    setTimeout(() => {
      confirmPw.classList.remove('inputError');
    }, 3000);
    return false;
  }

  return true;
};

const CambiarPw = () => {
  if(Validar() == false){
    return;
  }

  console.log('yay')

};

const Alerta = (tipo, mensaje) => {
  Swal.fire({
      icon: tipo,
      title: mensaje,
      confirmButtonText: 'Ok',
      confirmButtonColor: '#7F167F'
    });
};

btnRegistrarCont.addEventListener("click", CambiarPw)




