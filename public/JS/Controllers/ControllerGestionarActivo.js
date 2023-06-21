'use strict';
//Post de activo

async function ActivoPost(nombre, detalles,unidad,UbicacionDentroDeLaUnidad, IdDelSolicitante, FechaDeCreacion, EstadoDeAprobacion ) {
    // haciendo get de la lista de activos y obteniendo el numero mayor
    let lista = []
    let result = await ProcessGet("ListarActivo", null);
    lista = result.ListaActivosDB;
    //console.log(lista)
    let listaDeIDActivos = lista.map( ID => ID.IDActivo * 1);
    let numeroMayor
    if(listaDeIDActivos.length == 0){
        numeroMayor = 0
    } else numeroMayor = Math.max(...listaDeIDActivos);
    // ahora creo el nuevo id que tendria el activo a registrar
    let nuevoNumero = numeroMayor+1
    let nuevoId = nuevoNumero.toString().padStart(6, "0");
    console.log(nuevoId)
    console.log(typeof(nuevoId))


    let dataUnidadEnviar = {
        "ID" : unidad
    }
    let dataUnidad = await ProcessGet("ObtenerUnidadIdentificador", dataUnidadEnviar);
    let dataUnidadAusar = dataUnidad.unidadDB;
    console.log(dataUnidadAusar)
    let objetoAEnviar = {
        "IDActivo": nuevoId,
        "Nombre" : nombre,
        "Codigo": "Prov" + dataUnidadAusar.Nombre.slice(0,3) + UbicacionDentroDeLaUnidad.slice(0,3) ,
        "UbicacionCodigo": "prov_" + unidad + "_" + UbicacionDentroDeLaUnidad.slice(0,3),
        "UbicacionDentroDeLaUnidad": UbicacionDentroDeLaUnidad ,
        "Unidad": unidad,
        "Descripcion": detalles,
        "EstadoDeAprobacion": EstadoDeAprobacion,
        "IdDelSolicitante": IdDelSolicitante,
        "FechaDeCreacion": FechaDeCreacion
    }

    await ProcessPost("RegistrarActivo",objetoAEnviar);
    return nuevoId
}

function Fecha() {
    let fechaConFormato = new Date();
    let nuevafecha = `${fechaConFormato.getFullYear()}-${fechaConFormato.toLocaleString('default', {month: '2-digit'})}-${fechaConFormato.toLocaleString('default', {day: '2-digit'})}`
    return nuevafecha
}


