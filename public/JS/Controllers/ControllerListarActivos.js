'use strict';
// Este doc permite crear una lista de activos(tabla), ya sea para el informe de solicitudes pendientes o de reportes
let listaDeActivos = [];
let usuarioActual = ObtenerSesionActiva();

GetListaActivos();// llamo a la funcion
//simplemente estoy trayendo a lista de activos una lista de objetos de todas los activos del sistema
async function GetListaActivos(){
    let result = await ProcessGet('ListarActivo', null);
    let url = window.location.pathname;
    let filename = url.substring(url.lastIndexOf('/')+1);
    if (result != null && result.resultado == true) {
        listaDeActivos = result.ListaActivosDB;
        if (filename === 'Activos.html') {
            SolicitudeDeActivos();
        } if (filename === 'Reportes.html') {
            ReporteDeActivos();
        }
        
    } else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function SolicitudeDeActivos(){
    let tbody =  document.getElementById('tablaActivos');
    tbody.innerHTML = '';// limpio el body

    for (let i = 0; i < listaDeActivos.length; i++) {        // recorro la lista de personas
        if (listaDeActivos[i].EstadoDeAprobacion == 0) {
            
   
        let fila = tbody.insertRow();
        let celdaID = fila.insertCell();
        let celdaNombre = fila.insertCell();
        let celdaCodigo = fila.insertCell();
        let celdaUbicacion = fila.insertCell();
        let celdaDescripcion = fila.insertCell();
        let celdaIDDelSolicitante = fila.insertCell();
        let celdaAcciones = fila.insertCell(); // celda acciones es para ingresar los botones
        // estoy guardando en una variable cada elemento del html
        // es decir, una variable es igual a un tr vacio, otra igual a un td vacio, etc.
        // ***** me falta ingresar la fecha
        celdaID.innerHTML = listaDeActivos[i].IDActivo;
        celdaNombre.innerHTML = listaDeActivos[i].Nombre;
        celdaCodigo.innerHTML = listaDeActivos[i].Codigo;
        celdaUbicacion.innerHTML = listaDeActivos[i].UbicacionCodigo;
        celdaDescripcion.innerHTML = listaDeActivos[i].Descripcion;
        celdaIDDelSolicitante.innerHTML = listaDeActivos[i].IdDelSolicitante;
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
                title: 'Desea rechazar el registro de ' + listaDeActivos[i].IDActivo,
                icon: 'warning',
                confirmButtonText: 'Confirmar',
                denyButtonText: 'Cancelar',
                showDenyButton: true
            }).then((res) => {
                confirmacion = res.isConfirmed;
            });
            if (confirmacion == true) {
                BitacoraPost("Rechazo de registro De activo con id" + listaDeActivos[i].IDActivo, Fecha(), usuarioActual.Nombre,usuarioActual.NumeroIdentificacion, usuarioActual.Unidad )
                let data ={
                    'IDActivo':listaDeActivos[i].IDActivo
                };
                let result = await ProcessAction('delete', 'EliminarActivo', data);
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

        let btnAceptar = document.createElement('button');
        btnAceptar.type ='button';
        btnAceptar.innerText = '✅';
        btnAceptar.title = 'Aceptar';
        btnAceptar.classList.add('btnsTabla');
        btnAceptar.onclick = async function (){
            let confirmacion = false;
            await Swal.fire({
                title: 'Desea Aceptar el registro de ' + listaDeActivos[i].IDActivo,
                icon: 'warning',
                confirmButtonText: 'Confirmar',
                denyButtonText: 'Cancelar',
                confirmButtonColor: '#7F167F',
                cancelButtonColor: '#d33',
                showDenyButton: true
            }).then((res) => {
                confirmacion = res.isConfirmed;
            });
            if (confirmacion == true) {
                BitacoraPost("Aprobacion de registro De activo con id:" + listaDeActivos[i].IDActivo, Fecha(), usuarioActual.Nombre,usuarioActual.NumeroIdentificacion, usuarioActual.Unidad )
                let data ={
                    'IDActivo':listaDeActivos[i].IDActivo,
                    'EstadoDeAprobacion': 1
                };
                let result = await ProcessAction('put', 'ModificarActivo', data);
                if (result.resultado == true) {
                    ImprimirMsjSuccess(result.msj);
                } else {
                    ImprimirMsjError(result.msj);
                }
                await GetListaActivos();

            }
        };


        // guardo todos los botones en un div y como son elementos los agrego con appendChild.
        let divBtns = document.createElement('div');
        divBtns.appendChild(btnRechazar);
        divBtns.appendChild(btnAceptar);
        celdaAcciones.appendChild(divBtns);

    }}//cierre del if
}

    async function ReporteDeActivos(){
    let tbody =  document.getElementById('tablaActivos');
    tbody.innerHTML = '';

    for (let i = 0; i < listaDeActivos.length; i++) {        
        if (listaDeActivos[i].EstadoDeAprobacion == 1) {

            let nombreUnidad = await ProcessGet('ObtenerUnidadIdentificador', {'ID': listaDeActivos[i].Unidad});

            let fila = tbody.insertRow();
            let celdaID = fila.insertCell();
            let celdaNombre = fila.insertCell();
            let celdaCodigo = fila.insertCell();
            let celdaUbicacion = fila.insertCell();
            let celdaUnidad = fila.insertCell();
            let celdaDescripcion = fila.insertCell();
            let celdaAcciones = fila.insertCell();


            celdaID.innerHTML = listaDeActivos[i].IDActivo;
            celdaNombre.innerHTML = listaDeActivos[i].Nombre;
            celdaCodigo.innerHTML = listaDeActivos[i].Codigo;
            celdaUbicacion.innerHTML = listaDeActivos[i].UbicacionCodigo;
            celdaUnidad.innerHTML = nombreUnidad.unidadDB.Nombre;
            celdaDescripcion.innerHTML = listaDeActivos[i].Descripcion;

            let btnRechazar = document.createElement('button');
            btnRechazar.type ='button';
            btnRechazar.innerText = '🗑️';
            btnRechazar.title = 'Rechazar';
            btnRechazar.classList.add('btnsTabla');
            btnRechazar.onclick = async function (){// como es una eliminacion primero le hago una alerta
                let confirmacion = false;
                await Swal.fire({
                    title: 'Desea eliminar el activo de ' + listaDeActivos[i].IDActivo,
                    icon: 'warning',
                    confirmButtonText: 'Confirmar',
                    denyButtonText: 'Cancelar',
                    confirmButtonColor: '#7F167F',
                    cancelButtonColor: '#d33',
                    showDenyButton: true
                }).then((res) => {
                    confirmacion = res.isConfirmed;
                });
                if (confirmacion == true) {
                    BitacoraPost("Eliminacion del activo con id" + listaDeActivos[i].IDActivo, Fecha(), usuarioActual.Nombre,usuarioActual.NumeroIdentificacion, usuarioActual.Unidad )
                    let data ={
                        'IDActivo':listaDeActivos[i].IDActivo
                    };
                    let result = await ProcessAction('delete', 'EliminarActivo', data);
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
    
            let btnAceptar = document.createElement('button');
            btnAceptar.type ='button';
            btnAceptar.innerText = '✏️';
            btnAceptar.title = 'Editar';
            btnAceptar.classList.add('btnsTabla');
            btnAceptar.onclick = function (){
                location.href = 'Edicion.html?tipoForm=activo&_id=' + listaDeActivos[i]._id// Redireccionar a edición de activo
                // let confirmacion = false;
                // await Swal.fire({
                //     title: 'Desea Aceptar el registro de ' + listaDeActivos[i].IDActivo,
                //     icon: 'warning',
                //     confirmButtonText: 'Confirmar',
                //     denyButtonText: 'Cancelar',
                //     showDenyButton: true
                // }).then((res) => {
                //     confirmacion = res.isConfirmed;
                // });
                // if (confirmacion == true) {
                    // BitacoraPost("Aprobacion de registro De activo con id:" + listaDeActivos[i].IDActivo, Fecha(), usuarioActual.Nombre,usuarioActual.NumeroIdentificacion, usuarioActual.Unidad )
                    // let data ={
                    //     'IDActivo':listaDeActivos[i].IDActivo,
                    //     'EstadoDeAprobacion': 1
                    // };
                    // let result = await ProcessAction('put', 'ModificarActivo', data);
                    // if (result.resultado == true) {
                    //     ImprimirMsjSuccess(result.msj);
                    // } else {
                    //     ImprimirMsjError(result.msj);
                    // }
                    // await GetListaActivos();
    // 
                // }
            };
    
            // guardo todos los botones en un div y como son elementos los agrego con appendChild.
            let divBtns = document.createElement('div');
            divBtns.appendChild(btnAceptar);
            divBtns.appendChild(btnRechazar);
            celdaAcciones.appendChild(divBtns);
    

        }
    }}

    function ImprimirMsjError(msj) {
        Swal.fire({
            title: 'Error!',
            text: msj,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#7F167F',
            cancelButtonColor: '#d33',
        })
    }
    function ImprimirMsjSuccess(msj) {
        Swal.fire({
            title: 'Excelente!',
            text: msj,
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#7F167F',
            cancelButtonColor: '#d33',
        })
    }