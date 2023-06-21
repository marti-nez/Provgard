'use strict';

const tablaUsuarios = document.getElementById('tablaUsuarios');

const ObtenerListaUsuarios = async () => {
    let result = await ProcessGet('ListarUsuariosPorAprobar'); //Obtiene los usuarios que están pendientes de aprobación

    if (result == null || result.listaUsuariosDB == null || result == undefined) {
        Alerta('error', 'Ha ocurrido un error obteniendo la lista de usuarios');
        return;
    }

    return result.listaUsuariosDB; // Retorna el .listaUsuariosDB ya que solo se desea utilizar dicha lista para las operaciones.
};

const ImprimirTabla = async () => {

    let listaUsuarios = await ObtenerListaUsuarios();
    let usuarioRegistrado, resBitacora;

    tablaUsuarios.innerHTML = ''; // Limpia los datos de la tabla

    for(let i = 0; i< listaUsuarios.length; i++){ // repite por todos los registros de la variable listaUsuarios

        let usuario = listaUsuarios[i];
        let fila = tablaUsuarios.insertRow(); // Inserta una nueva fila
        let btnAprobar = document.createElement('button'); // Crea el botón de aprobar
        let btnDenegar = document.createElement('button'); // Crea el botón de negar
        let div = document.createElement('div'); // Crea el div que contendrá los botones de acción

        let nombreUnidad = await ProcessGet('ObtenerUnidadIdentificador', {'ID': usuario.Unidad});

        //Inserta el valor de cada celda correspondiente a cómo se estructuró la tabla del HTML
        fila.insertCell().innerHTML = usuario.Nombre;
        fila.insertCell().innerHTML = `${usuario.PrimerApellido} ${usuario.SegundoApellido}`; // Une los apellidos
        fila.insertCell().innerHTML = TransformarTipoId(usuario.TipoIdentificacion);
        fila.insertCell().innerHTML = usuario.NumeroIdentificacion;
        fila.insertCell().innerHTML = usuario.Correo;
        fila.insertCell().innerHTML = usuario.NumeroTelefono;
        fila.insertCell().innerHTML = usuario.DateNacimiento;
        fila.insertCell().innerHTML = nombreUnidad.unidadDB.Nombre ;
        fila.insertCell().innerHTML = TransformarEstado(usuario.Estado);

        btnAprobar.type = 'button';
        btnAprobar.innerHTML = '✔️';
        btnAprobar.title = 'Aprobar'
        btnAprobar.classList.add('btnTabla');
        btnAprobar.onclick = async() => {
            let confirmacion = false;
            await Swal.fire({
                title: 'Aprobar registro de usuario',
                text: "Una vez aprobado el usuario podrá acceder al sistema",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7F167F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aprobar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                confirmacion = result.isConfirmed; // En caso de presionar el botón de confirmar da true
              });

              if (confirmacion) { // En caso de ser true, pasa a la siguiente Alerta que solicita el rol
                let presionado = false;
                const {value: rol} = await Swal.fire({
                    icon: 'question',
                    text: 'Seleccione el rol',
                    input: 'select',
                    inputOptions: {1: 'Jefatura', 2: 'Proveeduría', 3: 'Encargado de Unidad'},
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#7F167F',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancelar',
                    inputValidator: (value) => {
                        return new Promise((resolve) => {
                            resolve()
                        })
                    }
                });

                if (rol) { // Si se selecciona un rol y se le da al botón de aceptar
                    let resultado = await ProcessPut('EstadoUsuario', {'_id': usuario._id, 'Estado': 1, 'Rol': rol}); // Pone Estado activo e indica rol

                    if (resultado.result) {
                        Alerta('success', 'El registro ha sido aprobado');
                    } else {
                        Alerta('error', 'Ocurrió un error');
                    }

                    // enviar log a bitacora
                    usuarioRegistrado = await ProcessGet('ObtenerUsuarioId', {'_id': usuario._id});
                    resBitacora = await logBitacora(`Aprobar registro de usuario con id: ${usuarioRegistrado.usuarioDB.NumeroIdentificacion}`);

                    window.location.reload();
                }
              }
        };
        btnDenegar.type = 'button';
        btnDenegar.innerHTML = '❌';
        btnDenegar.title = 'Denegar'
        btnDenegar.classList.add('btnTabla');
        btnDenegar.onclick = async() => {
            let confirmacion = false;
            await Swal.fire({
                title: 'Negar registro de usuario',
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
                let idPorBorrar = usuario._id;
                let fueBorrado = await ProcessDelete('EliminarUsuario', {'_id': usuario._id});

                if (fueBorrado.result) {
                    Alerta('success', 'El registro ha sido negado');

                    resBitacora = await logBitacora('Negar registro de usuario');
                } else {
                    Alerta('error', 'Ocurrió un error');
                }
              }

              window.location.reload();

        };

        // agrega los botones al div
        div.appendChild(btnAprobar);
        div.appendChild(btnDenegar);

        // agrega el div a la celda que se inserta en la fila
        fila.insertCell().appendChild(div);

    }
};

const logBitacora = async (tipoMovimiento) => {
    let sesionActiva = ObtenerSesionActiva();
    let fecha = new Date();
    let dataBitacora = {
        'TipoDeMovimiento': tipoMovimiento,
        'Fecha': `${fecha.getFullYear()}-${fecha.toLocaleString('default', {month: '2-digit'})}-${fecha.toLocaleString('default', {day: '2-digit'})}`,
        'NombreDelUsuario': sesionActiva.Nombre,
        'UsuarioId': sesionActiva.NumeroIdentificacion,
        'Unidad': sesionActiva.Unidad
    };

    let resultBitacora = await ProcessPost('RegistrarBitacora', dataBitacora);
};

const RegistrarUsuarioGest = async (data) => {

    let result = await ProcessPost('RegistrarUsuario', data);

    if (result == null || result.usuarioDB == null || result == undefined) {
        Alerta('error', 'Ocurrio un error realizando el registro, por favor revise');
        return;
    }

    let resultBitacora = await logBitacora(`Registrar usuario con id: ${data.NumeroIdentificacion}`);

    Alerta('success', 'El usuario fue registrado con éxito');

};

const GenerarContrasegnaAleatoria = () => {
    let result = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%*';
    const len = caracteres.length; // consigue la cantidad de caracteres que  tiene el string anterior

    for (let i = 0; i < 10; i++) { // se parametriza i < 10 porque se desea que la contraseña posea 10 caracteres
        result += caracteres[Math.floor(Math.random() * len)]; // Math random () * len obtiene un número al azar entre 0 y el largo de
                                                               // caracteres de la variable len. Math floor redondea ese valor para que
                                                               // sea un valor entero.
                                                               // caracteres[numero] obtiene el caracter que se encuentra en el índice numero
    }

    return result;
};

ImprimirTabla(); // Al cargar la página la llama por defecto

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
    }
};

const TransformarEstado = (num) => {
    switch (num) {
        case -1:
            return 'Inactivo'
        case 0:
            return 'Pendiente de aprobación'
        case 1:
            return 'Activo'
    }
};