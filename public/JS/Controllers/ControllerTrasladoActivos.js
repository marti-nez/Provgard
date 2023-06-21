'use strict';

const btnRegistrar = document.getElementById('btnRegistrar');
const form = document.querySelector('#form');
const btnPost = document.getElementById("btnRegistrar1");
const selectUnidad = document.getElementById("txtunidad")
const estadoDelActivo = document.getElementById("txtactivo")

// Obtener elementos con las clases que los catalogan segun su rol

const noEncargadoUnidad = document.querySelectorAll('.noEncargadoUnidad');
let usuarioActual = ObtenerSesionActiva();



function ValorEstadoDelActivo() {
    return estadoDelActivo.value
}


const AgregarOptsSelect = async () => {

    let estadoDelActivoAUsar = ValorEstadoDelActivo()
    console.log(estadoDelActivoAUsar)
    let result = await ProcessGet('ListarUnidades');

    if (estadoDelActivoAUsar == "Dañado") {
        let optBodega = document.createElement('option');
        optBodega.value = "U000014";
        optBodega.innerHTML = "Bodega";
        selectUnidad.appendChild(optBodega);
        Alerta('warning', 'Si el activo esta dañado unicamente podrá enviar a bodega.')

    }
    else {
        for (let unidad of result.listaUnidades) {
            let opt = document.createElement('option');
            opt.value = unidad.ID;
            opt.innerHTML = unidad.Nombre;
            selectUnidad.appendChild(opt);
        }
    }

};

estadoDelActivo.addEventListener("change", AgregarOptsSelect)
// AgregarOptsSelect();

const Validar = () => {
    let txtidentificacion = document.getElementById('txtidentificacion');
    console.log(txtidentificacion.value)
    if (txtidentificacion.value < 0 || txtidentificacion.value == null || txtidentificacion.value == undefined || txtidentificacion.value == '') {
        Alerta('error', 'El numero de identificación no es valido.');
        txtidentificacion.classList.add('inputError');

        setTimeout(() => {
            txtidentificacion.classList.remove('inputError');
        }, 3000);

        return false;
    }

    let txtunidad = document.getElementById('txtunidad');
    if (txtunidad.value == '' || txtunidad.value == null || txtunidad.value == undefined) {
        Alerta('error', 'Necesita ingresar una unidad correcta.');

        txtunidad.classList.add('inputError');

        setTimeout(() => {
            txtunidad.classList.remove('inputError');
        }, 3000);

        return false;
    }

    let txtactivo = document.getElementById('txtactivo');
    if (txtactivo.value == '' || txtactivo.value == null || txtactivo.value == undefined) {
        Alerta('error', 'Elija el estado del activo');

        txtactivo.classList.add('inputError');

        setTimeout(() => {
            txtactivo.classList.remove('inputError');
        }, 3000);

        return false;
    }

    let txtrazon = document.getElementById('txtrazon');
    if (txtrazon.value == '' || txtrazon.value == null || txtrazon.value == undefined) {
        Alerta('error', 'Digite una razon para la transferencia');

        txtrazon.classList.add('inputError');

        setTimeout(() => {
            txtrazon.classList.remove('inputError');
        }, 3000);

        return false;
    }

    let fileInput = document.getElementById('file-input');
    let imgActivo = document.getElementById('imgActivo');
    console.log(fileInput.files)
    if (!fileInput.files || fileInput.files.length < 2) {
        Alerta('error', 'Por favor adjunte al menos dos imagenes del activo');

        imgActivo.classList.add('inputError');

        setTimeout(() => {
            imgActivo.classList.remove('inputError');
        }, 3000);

        return false;
    }


    let variableTemporal = ObtenerSesionActiva();
    if (variableTemporal.Rol == 3) {
        Alerta('success', 'Se realizo la solicitud de traslado con exito');
    }
    else {
        Alerta('success', 'Fue realizado el traslado con éxito');
    }

    // Elementos para el post
    let rolDeaprobacion = 1
    if (variableTemporal.Rol == 3) {
        rolDeaprobacion = 0
    }
    console.log(rolDeaprobacion)
    let id = String(variableTemporal.NumeroIdentificacion)
    let idActivo = document.getElementById("txtidentificacion");
    let UnidadATransferir = document.getElementById("txtunidad");
    let EstadoDelActivo = document.getElementById("txtactivo");
    let RazondeTransferencia = document.getElementById("txtrazon");
    TasladoPost(idActivo.value, Fecha(), UnidadATransferir.value, EstadoDelActivo.value, RazondeTransferencia.value, id, rolDeaprobacion)
    if (rolDeaprobacion != 3) {
        TrasladoAceptadoPut(idActivo.value, UnidadATransferir.value)
    }

}

const Alerta = (tipo, mensaje) => {
    Swal.fire({
        icon: tipo,
        title: mensaje,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#7F167F'
    });
};

const ToggleTraslado = () => {
    lista.classList.add('ocultar');
    form.classList.remove('ocultar');

};

const Acceso = () => {

    if (usuarioActual.Rol == 3) {
        for (let elemento of noEncargadoUnidad) {
            elemento.classList.add('ocultar');
        }

        form.classList.remove("ocultar");

        // registrarActivoForm.classList.add('mostrar');
        btnRegistrar.classList.add('ocultar');
    }
};

Acceso();

btnRegistrar.addEventListener('click', ToggleTraslado);
btnPost.addEventListener('click', Validar)