'use strict';
async function BitacoraPost(TipoDeMovimiento,Fecha,NombreDelUsuario,UsuarioId,Unidad) {
    let objetoAEnviar = {
        "TipoDeMovimiento": TipoDeMovimiento,
        "Fecha" : Fecha,
        "NombreDelUsuario": NombreDelUsuario,
        "UsuarioId": UsuarioId,
        "Unidad": Unidad
    }

    await ProcessPost("RegistrarBitacora",objetoAEnviar)
}

function Fecha() {

    let fechaConFormato = new Date()
    let nuevafecha = `${fechaConFormato.getFullYear()}-${fechaConFormato.toLocaleString('default', {month: '2-digit'})}-${fechaConFormato.toLocaleString('default', {day: '2-digit'})}`
    return nuevafecha
}


