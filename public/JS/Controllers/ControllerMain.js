'use strict';

// funciones para ocultar/mostrar pantallas
const MostrarForm = () => {
    lista.classList.remove('mostrar')
    lista.classList.add('ocultar');
    registrarUnidadForm.classList.remove('ocultar');
    registrarUnidadForm.classList.add('mostrar');
};

const OcultarForm = () => {
    registrarUnidadForm.classList.remove('mostrar');
    registrarUnidadForm.classList.add('ocultar');
    lista.classList.remove('ocultar');
    lista.classList.add('mostrar');
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