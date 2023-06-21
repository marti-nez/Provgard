'use strict';

// Usuario
let formUsuario = document.getElementById("formEditarUsuario");
let txtNombre = document.getElementById("txtNombre");
let txtPrimerApellido = document.getElementById("txtPrimerApellido");
let txtSegundoApellido = document.getElementById("txtSegundoApellido");
let slctTipoIdentificacion = document.getElementById("slctTipoIdentificacion");
let numIdentificacion = document.getElementById("numIdentificacion");
let txtCorreo = document.getElementById("txtCorreo");
let numTelefono = document.getElementById("numTelefono");
let dateNacimiento = document.getElementById("dateNacimiento");
let slctUnidad = document.getElementById("slctUnidad*");
let slctRol = document.getElementById("slctRol");

// Unidad

let formUnidad = document.getElementById("formEditarUnidad");
let nombreUnidad = document.getElementById('txtNombreUd');
let DescripcionUnidad = document.getElementById('txtDescripcionUd');
let ProvinciaUnidad = document.getElementById('slctProvinciaUd');
let CantonUnidad = document.getElementById('slctCantonUd');
let DistritoUnidad = document.getElementById('slctDistritoUd');
let SegnasUnidad = document.getElementById('segnasDireccionUd');

// Activo

let formActivo = document.getElementById("formEditarActivo"); // Agregar ID de form activo
let nombreActivo = document.getElementById('txtNombreAc');
let detallesActivo = document.getElementById('txtDetallesAc');
let UnidadActivo = document.getElementById('slctUnidadAc');
let UbicacionActivo = document.getElementById('txtubicacionUnidad');

// Queries

const EditarUsuario = (usuario) => { // recibe por parámetro un objeto con la información del usuario
    txtNombre.value = usuario.Nombre;
    txtPrimerApellido.value = usuario.PrimerApellido;
    txtSegundoApellido.value = usuario.SegundoApellido;
    slctTipoIdentificacion.value = usuario.TipoIdentificacion;
    numIdentificacion.value = usuario.NumeroIdentificacion;
    txtCorreo.value = usuario.Correo;
    numTelefono.value = usuario.NumeroTelefono;
    dateNacimiento.value = usuario.DateNacimiento;
    slctUnidad.value = usuario.Unidad;
    slctRol.value = usuario.Rol;
};

const EditarUnidad = (unidad) => {
    nombreUnidad.value = unidad.Nombre;
    DescripcionUnidad.value = unidad.Descripcion;
    ProvinciaUnidad.value = unidad.Provincia;
    CantonUnidad.value = unidad.Canton;
    DistritoUnidad.value = unidad.Distrito;
    SegnasUnidad.value = unidad.Segnas;
};

const EditarActivo = (activo) => {
    nombreActivo.value = activo.Nombre;
    detallesActivo.value = activo.Descripcion;
    UnidadActivo.value = activo.Unidad;
    UbicacionActivo.value = activo.UbicacionDentroDeLaUnidad;
    
};

const AgregarOptsSelect = async() => {
    let result = await ProcessGet('ListarUnidades');

    for (let unidad of result.listaUnidades){
        let opt = document.createElement('option');
        opt.value = unidad.ID;
        opt.innerHTML = unidad.Nombre;
        // slctUnidad.appendChild(opt);
        UnidadActivo.appendChild(opt);
    }

    for (let unidad of result.listaUnidades){
        let opt = document.createElement('option');
        opt.value = unidad.ID;
        opt.innerHTML = unidad.Nombre;
        slctUnidad.appendChild(opt);
        // UnidadActivo.appendChild(opt);
    }

};

const FormAEditar = async () => {
    let idAEditar, urlParams, queryString, formOculto;

    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);
    formOculto = urlParams.get("tipoForm");

    if (formOculto == 'usuario') {
        formUsuario.classList.remove('ocultar');
        idAEditar = await ProcessGet('ObtenerUsuarioId', {'_id': urlParams.get("_id")});
        return EditarUsuario(idAEditar.usuarioDB);
    };

    if (formOculto == 'unidad') {
        formUnidad.classList.remove("ocultar");
        idAEditar = await ProcessGet('ObtenerUnidadId', {'_id': urlParams.get("_id")});
        return EditarUnidad(idAEditar.unidadDB);
    }

    if (formOculto == 'activo') {
        formActivo.classList.remove('ocultar');
        idAEditar = await ProcessGet('BuscarActivoPor_Id', {'_id': urlParams.get("_id")});
        return EditarActivo(idAEditar.ActivoDB);
    }
};

AgregarOptsSelect();
FormAEditar();
