'use strict';
//Post de traslado

async function TasladoPost(IDDelAcivo, fecha, UnidadPosteriorAlEnvio, EstadoDelActivo, MotivoDeTransferencia, IdDelSolicitante,  EstadoDeAprobacion  ) {
    // haciendo get de la lista de activos y obteniendo el numero mayor
    let lista = []
    let result = await ProcessGet("ListarTraslado", null);
    console.log(result)
    lista = result.ListaTrasladosDB;
    console.log(lista)
    let listaDeIDTraslados = lista.map( ID => ID.IdDelTraslado.substring(1) * 1);
    console.log(listaDeIDTraslados + 2)
    let numeroMayor
    if (listaDeIDTraslados.length == 0 ) {
        numeroMayor = 0
    }else{numeroMayor = Math.max(...listaDeIDTraslados);}
    // ahora creo el nuevo id que tendria el activo a registrar
    let nuevoNumero = numeroMayor+1
    console.log(nuevoNumero + "numero Mayor nuevo")
    let nuevoId =  "T" + nuevoNumero.toString().padStart(5, "0");

    // trayendo el objeto del activo a trasladar
    let data = {
        IDActivo : IDDelAcivo
    }
    let ActivoData = await ProcessGet("BuscarActivoPorId", data);
    let ActivoATrasladar = ActivoData.ActivoDB
    //
    let objetoAEnviar = {
        "IdDelActivo": IDDelAcivo,
        "IdDelTraslado": nuevoId,
        "FechaDeTraslado" : fecha,
        "NombreDelActivo": ActivoATrasladar.Nombre,
        "UnidadPrevioAlEnvio": ActivoATrasladar.Unidad,
        "UnidadPosteriorAlEnvio": UnidadPosteriorAlEnvio ,
        "EstadoDelActivo": EstadoDelActivo,
        "MotivoDeTransferencia": MotivoDeTransferencia,
        "IdDelSolicitante": IdDelSolicitante,
        "EstadoDeAprobacion": EstadoDeAprobacion,

    }
    await ProcessPost("SolicitarTraslado",objetoAEnviar);
    return objetoAEnviar
}

function Fecha() {

    // let dateObj = new Date();
    // let month = dateObj.getUTCMonth() + 1; //months from 1-12
    // let day = dateObj.getUTCDate();
    // let year = dateObj.getUTCFullYear();
    // let newdate = year + "/" + month + "/" + day;
    // return newdate

    let fechaConFormato = new Date()
    let nuevafecha = `${fechaConFormato.getFullYear()}-${fechaConFormato.toLocaleString('default', {month: '2-digit'})}-${fechaConFormato.toLocaleString('default', {day: '2-digit'})}`
    return nuevafecha
}


async function TrasladoAceptadoPut(IDActivo, Unidad){
    let data = {
        "IDActivo": IDActivo,
        "Unidad": Unidad
    }
    await ProcessAction('put', 'ModificarActivo', data)

}
