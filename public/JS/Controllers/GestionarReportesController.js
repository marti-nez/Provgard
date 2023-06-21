'use strict';

const tablaUsuariosBody = document.getElementById('tablaUsuariosBody');
const tablaUnidadesBody = document.getElementById('tablaUnidadesBody');

const ObtenerListaUsuarios = async () => {
    let result = await ProcessGet('ListarUsuarios'); //Obtiene los usuarios 

    if (result == null || result.listaUsuariosDB == null || result == undefined) {
        Alerta('error', 'Ha ocurrido un error obteniendo la lista de usuarios');
        return;
    }

    return result.listaUsuariosDB; // Retorna el .listaUsuariosDB ya que solo se desea utilizar dicha lista para las operaciones.
};

const ObtenerUnidades = async () => {
    let resulto = await ProcessGet('ListarUnidades'); //Obtiene las unidades 

    if (resulto == null || resulto.listaUnidades == null || resulto == undefined) {
        Alerta('error', 'Ha ocurrido un error obteniendo la lista de unidades');
        return;
    }

    return resulto.listaUnidades; // Retorna el .listaUnidades ya que solo se desea utilizar dicha lista para las operaciones.
};

const ImprimirTablaUsuarios = async () => {

    let listaUsuarios = await ObtenerListaUsuarios();
    // let usuarioRegistrado, resBitacora;

    tablaUsuariosBody.innerHTML = ''; // Limpia los datos de la tabla

    for(let i = 0; i< listaUsuarios.length; i++){ // repite por todos los registros de la variable listaUsuarios

        let usuario = listaUsuarios[i];
        let fila = tablaUsuariosBody.insertRow(); // Inserta una nueva fila
        let btnEditar = document.createElement('button'); // Crea el botón de editar
        let btnEliminar = document.createElement('button'); // Crea el botón de eliminar
        let div = document.createElement('div'); // Crea el div que contendrá los botones de acción

        let nombreUnidad = await ProcessGet('ObtenerUnidadIdentificador', {'ID': usuario.Unidad});

        //Inserta el valor de cada celda correspondiente a cómo se estructuró la tabla del HTML
        fila.insertCell().innerHTML = usuario.Nombre;
        fila.insertCell().innerHTML = `${usuario.PrimerApellido} ${usuario.SegundoApellido}`; // Une los apellidos
        fila.insertCell().innerHTML = TransformarTipoId(usuario.TipoIdentificacion);
        fila.insertCell().innerHTML = usuario.NumeroIdentificacion;
        fila.insertCell().innerHTML = usuario.NumeroTelefono;
        fila.insertCell().innerHTML = usuario.DateNacimiento;
        fila.insertCell().innerHTML = usuario.Correo;
        fila.insertCell().innerHTML = TransformarRol(usuario.Rol);
        fila.insertCell().innerHTML = nombreUnidad.unidadDB.Nombre;
        fila.insertCell().innerHTML = TransformarEstado(usuario.Estado);

        btnEditar.type = 'button';
        btnEditar.innerHTML = '✏️';
        btnEditar.title = 'Editar'
        btnEditar.classList.add('btnTabla');
        btnEditar.onclick = async() => {
            location.href = 'Edicion.html?tipoForm=usuario&_id=' + usuario._id// Redireccionar a edición de unidad// Redireccionar a edición de usuario
        };
        btnEliminar.type = 'button';
        btnEliminar.innerHTML = '🗑️';
        btnEliminar.title = 'Eliminar'
        btnEliminar.classList.add('btnTabla');
        btnEliminar.onclick = async() => {
            let confirmacion = false;
            await Swal.fire({
                title: 'Eliminar usuario',
                text: "Esta acción no puede ser revertida",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7F167F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                confirmacion = result.isConfirmed;
              });

              if (confirmacion) {
                let fueBorrado = await ProcessDelete('EliminarUsuario', {'_id': usuario._id});

                if (fueBorrado.result) {
                    Alerta('success', 'El usuario ha sido eliminado');

                } else {
                    Alerta('error', 'Ocurrió un error');
                }
              }

              window.location.reload();

        };

        // agrega los botones al div
        div.appendChild(btnEditar);
        div.appendChild(btnEliminar);

        // agrega el div a la celda que se inserta en la fila
        fila.insertCell().appendChild(div);

    }
};

const ImprimirTablaUnidades = async () => {

    let listaUnidades = await ObtenerUnidades();

    tablaUnidadesBody.innerHTML = ''; // Limpia los datos de la tabla

    for(let i = 0; i< listaUnidades.length; i++){ // repite por todos los registros de la variable listaUnidades

        let unidad = listaUnidades[i];
        let fila = tablaUnidadesBody.insertRow(); // Inserta una nueva fila
        let btnEditar = document.createElement('button'); // Crea el botón de editar
        let btnEliminar = document.createElement('button'); // Crea el botón de eliminar
        let btnInactivar = document.createElement('button'); // Crea el botón de eliminar
        let div = document.createElement('div'); // Crea el div que contendrá los botones de acción

        //Inserta el valor de cada celda correspondiente a cómo se estructuró la tabla del HTML
        fila.insertCell().innerHTML = unidad.Nombre;
        fila.insertCell().innerHTML = unidad.Descripcion; // Une los apellidos
        fila.insertCell().innerHTML = `${unidad.Provincia}, ${unidad.Canton}, ${unidad.Distrito}, ${unidad.Segnas}`;
        fila.insertCell().innerHTML = unidad.ID;
        fila.insertCell().innerHTML = TransformarEstado(unidad.Estado);

        btnEditar.type = 'button';
        btnEditar.innerHTML = '✏️';
        btnEditar.title = 'Editar'
        btnEditar.classList.add('btnTabla');
        btnEditar.onclick = async() => {
            location.href = 'Edicion.html?tipoForm=unidad&_id=' + unidad._id// Redireccionar a edición de unidad
        };
        btnEliminar.type = 'button';
        btnEliminar.innerHTML = '🗑️';
        btnEliminar.title = 'Eliminar'
        btnEliminar.classList.add('btnTabla');
        btnEliminar.onclick = async() => {
            let confirmacion = false;
            await Swal.fire({
                title: 'Eliminar unidad',
                text: "Esta acción no puede ser revertida",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7F167F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                confirmacion = result.isConfirmed;
              });

              if (confirmacion) {
                let fueBorrado = await ProcessDelete('EliminarUnidad', {'_id': unidad._id});

                if (fueBorrado.result) {
                    Alerta('success', 'La unidad ha sido eliminado');

                } else {
                    Alerta('error', 'Ocurrió un error');
                }
              }

              window.location.reload();

        };
        
        btnInactivar.type = 'button';
        btnInactivar.innerHTML = '🚫';
        btnInactivar.title = 'Eliminar'
        btnInactivar.classList.add('btnTabla');
        btnInactivar.onclick = async() => {
            let confirmacion = false;
            await Swal.fire({
                title: 'Inactivar unidad',
                text: "Puede revertir esta acción editando la unidad",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7F167F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                confirmacion = result.isConfirmed;
              });

              if (confirmacion) {
                let fueInactivado = await ProcessPut('EstadoUnidad', {'_id': unidad._id, 'Estado': -1});

                if (fueInactivado.result) {
                    Alerta('success', 'La unidad ha sido inactivada');

                } else {
                    Alerta('error', 'Ocurrió un error');
                }
              }

              window.location.reload();

        };

        // agrega los botones al div
        div.appendChild(btnEditar);
        div.appendChild(btnEliminar);
        div.appendChild(btnInactivar);

        // agrega el div a la celda que se inserta en la fila
        fila.insertCell().appendChild(div);

    }
};

ImprimirTablaUsuarios();
ImprimirTablaUnidades();

const TransformarTipoId = (num) => {
    switch (num) {
        case 1:
            return 'Física';
        case 2:
            return 'Jurídica';
        case 3:
            return 'DIMEX';
        case 4:
            return 'Pasaporte';
    };
};

const TransformarRol = (num) => {
    switch (num) {
        case 1:
            return "Jefatura";
        case 2:
            return "Proveeduría";
        case 3:
            return "Encargado de unidad";
        default:
            return "Sin rol";
    }
};

const TransformarEstado = (num) => {
    switch (num) {
        case -1:
            return 'Inactivo';
        case 0:
            return 'Pendiente de aprobación';
        case 1:
            return 'Activo';
    }
};