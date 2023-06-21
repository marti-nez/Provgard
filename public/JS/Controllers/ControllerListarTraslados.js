'use strict';
// Este doc permite crear una lista de traslados(tabla), ya sea para el informe de solicitudes pendientes o de reportes
let listaDeTraslados = [];
let usuarioActualG = ObtenerSesionActiva();

GetListaTraslados();// llamo a la funcion
//simplemente estoy trayendo a lista de traslados una lista de objetos de todas los traslados del sistema
async function GetListaTraslados(){
    let result = await ProcessGet('ListarTraslado', null);
    let url = window.location.pathname;
    let filename = url.substring(url.lastIndexOf('/')+1);
    if (result != null && result.resultado == true) {
        listaDeTraslados = result.ListaTrasladosDB;
            SolicitudeDeTraslado();
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function SolicitudeDeTraslado(){
    let tbody =  document.getElementById('tablaActivos');

    tbody.innerHTML = '';// limpio el body

    for (let i = 0; i < listaDeTraslados.length; i++) {        // recorro la lista de traslados
        if (listaDeTraslados[i].EstadoDeAprobacion == 0) {
            
        let fila = tbody.insertRow();
        let celdaID = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaUnidadActual = fila.insertCell();
        let celdaUnidadSolicitada = fila.insertCell();
        let celdaEstadoDelActivo = fila.insertCell();
        let celdaMotivoDeTransferencia = fila.insertCell();
        let celdaIDDelSolicitante = fila.insertCell();
        let celdaAcciones = fila.insertCell(); // celda acciones es para ingresar los botones
        let celdaImagen = fila.insertCell();
        // estoy guardando en una variable cada elemento del html
        // es decir, una variable es igual a un tr vacio, otra igual a un td vacio, etc.
        // ***** me falta ingresar la fecha
        celdaID.innerHTML = listaDeTraslados[i].IdDelActivo;
        celdaNombre.innerHTML = listaDeTraslados[i].NombreDelActivo;
        celdaUnidadActual.innerHTML = listaDeTraslados[i].UnidadPrevioAlEnvio;
        celdaUnidadSolicitada.innerHTML = listaDeTraslados[i].UnidadPosteriorAlEnvio;
        celdaEstadoDelActivo.innerHTML = listaDeTraslados[i].EstadoDelActivo;
        celdaMotivoDeTransferencia.innerHTML = listaDeTraslados[i].MotivoDeTransferencia;
        celdaIDDelSolicitante.innerHTML = listaDeTraslados[i].IdDelSolicitante;
        // luego con el innerHtml ingreso en los td vacios
        // cada uno de los elementos del objeto dentro de la tabla

        let btnRechazar = document.createElement('button');
        btnRechazar.type ='button';
        btnRechazar.innerText = '🗑️';
        btnRechazar.title = 'Rechazar';
        btnRechazar.classList.add('btnsTabla');
        btnRechazar.onclick = async function (){// como es una eliminacion primero le hago una alerta
            let confirmacion = false;
            await Swal.fire({
                title: 'Desea rechazar el traslado de ' + listaDeTraslados[i].IdDelActivo,
                icon: 'warning',
                confirmButtonText: 'Confirmar',
                denyButtonText: 'Cancelar',
                showDenyButton: true
            }).then((res) => {
                confirmacion = res.isConfirmed;
            });
            if (confirmacion == true) {
                BitacoraPost("Rechazo de registro De activo", Fecha(), usuarioActualG.Nombre,usuarioActualG.NumeroIdentificacion, usuarioActualG.Unidad )
                let data ={
                    'IdDelTraslado':listaDeTraslados[i].IdDelTraslado
                };
                let result = await ProcessAction('delete', 'EliminarTraslado', data);
                if (result.resultado == true) {
                    ImprimirMsjSuccess(result.msj);
                } else {
                    ImprimirMsjError(result.msj);
                }
                await GetListaActivos();
                // como se confirmo la eliminacion estoy enviendo el objeto como id para que elimine
                // le confirmo que se elimino
                // vuelvo a crear la tabla con los nuevos datos
            }

        
        };

        let imagen1 = new Image()
        imagen1.src = "../img/Perfil1.png"
        imagen1.classList = 'imgTabla'

        let imagen2 = new Image()
        imagen2.src = "../img/Perfil1.png"
        imagen2.classList = 'imgTabla'

        let btnAceptar = document.createElement('button');
        btnAceptar.type ='button';
        btnAceptar.innerText = '✅';
        btnAceptar.title = 'Aceptar';
        btnAceptar.classList.add('btnsTabla');
        btnAceptar.onclick = async function (){
            let confirmacion = false;
            await Swal.fire({
                title: 'Desea Aceptar el Traslado de ' + listaDeTraslados[i].IdDelActivo,
                icon: 'warning',
                confirmButtonText: 'Confirmar',
                denyButtonText: 'Cancelar',
                showDenyButton: true
            }).then((res) => {
                confirmacion = res.isConfirmed;
            });
            if (confirmacion == true) {
                TrasladoAceptadoPut(listaDeTraslados[i].IdDelActivo, listaDeTraslados[i].UnidadPosteriorAlEnvio);
                BitacoraPost("Aprobacion de traslado", Fecha(), usuarioActualG.Nombre,usuarioActualG.NumeroIdentificacion, usuarioActualG.Unidad );
                let data ={
                    'IdDelTraslado':listaDeTraslados[i].IdDelTraslado,
                    'EstadoDeAprobacion': 1
                };
                console.log(data)
                let result = await ProcessAction('put', 'ModificarTraslado', data);
                if (result.resultado == true) {
                    ImprimirMsjSuccess(result.msj);
                } else {
                    ImprimirMsjError(result.msj);
                }
                await GetListaTraslados();

            }
        };


        // guardo todos los botones en un div y como son elementos los agrego con appendChild.
        let divBtns = document.createElement('div');
        divBtns.appendChild(btnRechazar);
        divBtns.appendChild(btnAceptar);
        celdaAcciones.appendChild(divBtns);

        let imagenes = document.createElement("div")
        imagenes.appendChild(imagen1)
        imagenes.appendChild(imagen2)
        celdaImagen.appendChild(imagenes)
        
    }}//cierre del if
}

function ImprimirMsjError(msj) {
    Swal.fire({
        title: 'Error!',
        text: msj,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}
function ImprimirMsjSuccess(msj) {
    Swal.fire({
        title: 'Excelente!',
        text: msj,
        icon: 'success',
        confirmButtonText: 'Ok'
    })
}