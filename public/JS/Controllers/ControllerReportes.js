'use strict';


const reportesFiltros = {
    Activos: ['ID', 'Nombre', 'Ubicación', 'Unidad','Fecha de creación'],
    // Bitácora: [],
    Unidades: ['ID', 'Ubicación', 'Nombre','Fecha de creación'],
    Usuarios: ['ID', 'Unidad', 'Nombre', 'Apellidos', 'Correo','Fecha de creación']
}

const tipoReporte = document.getElementById('tipoReporte'),
      tipoFiltro = document.getElementById('tipoFiltro'),
      filtroTabla = document.getElementById('filtroTabla'),
      tablaHeadActivos = document.getElementById('tablaHeadActivos'),
      tablaUsuarios = document.getElementById('tablaUsuarios'),
      tablaUnidades = document.getElementById('tablaUnidades');


const bitacora = document.getElementById('bitacora');
const noEncargadoUnidad = document.querySelectorAll('.noEncargadoUnidad');
const usuarioActualR = ObtenerSesionActiva();


const PrincipalReportes = () => {

    tipoFiltro.disabled = true;
    filtroTabla.disabled = true;

    tipoFiltro.length = 1;

    for (let tipo in reportesFiltros) {
        tipoReporte.options[tipoReporte.options.length] = new Option(tipo, tipo);
    }

    tipoReporte.onchange = (evento) => {

        tipoFiltro.disabled = false;
        MostrarTabla();
        

        tipoFiltro.length = 1;
        let valores = reportesFiltros[evento.target.value];

        for (let i = 0; i < valores.length; i++) {
            tipoFiltro.options[tipoFiltro.options.length] = new Option(valores[i], valores[i]);
        }
        
    };

    tipoFiltro.onchange = () => {
        filtroTabla.disabled = false;
        
    };
    MostrarRangoFechas();

};


const MostrarRangoFechas = () => {
    if (tipoFiltro.value == 'Fecha de creación') {
        tipoReporte.classList.add('ocultar');
        tipoFiltro.classList.add('ocultar');
        filtroTabla.classList.add('ocultar');
        return;
    }
};

const MostrarTabla = () => {

    if (tipoReporte.value == null || tipoReporte.value == undefined || tipoReporte.value == '') {
        Alerta('error', 'Por favor seleccione un tipo de reporte');
        InputInvalido(tipoReporte);

        return;
    }

    if (tipoReporte.value == 'Activos'){
        tablaUnidades.classList.add('ocultar');
        tablaUsuarios.classList.add('ocultar');
        tablaHeadActivos.classList.remove('ocultar');
        //bitacora.classList.add('ocultar');
        return;
    }

    if (tipoReporte.value == 'Usuarios'){
        tablaUnidades.classList.add('ocultar');
        tablaUsuarios.classList.remove('ocultar');
        tablaHeadActivos.classList.add('ocultar');
        // bitacora.classList.add('ocultar');
        return;
    }

    if (tipoReporte.value == 'Unidades'){
        tablaUnidades.classList.remove('ocultar');
        tablaUsuarios.classList.add('ocultar');
        tablaHeadActivos.classList.add('ocultar');
        // bitacora.classList.add('ocultar');
        return;
    }

};

const InputInvalido = (idInput) => {
    let input = document.getElementById(idInput);
    let estiloOriginal = input.style;

    input.style = 'border: 1px solid #D70040;';

    setTimeout(() => {
        elementLabel.style = estiloOriginal;
    }, 5000);
}

const Alerta = (tipo, mensaje) => {
    Swal.fire({
        icon: tipo,
        title: mensaje,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#7F167F'
      });
};

const Acceso = () => {

    if (usuarioActualR.Rol == 3) {
        for (let elemento of noEncargadoUnidad) {
            elemento.classList.add('ocultar');
        }
    }
};

Acceso();

window.addEventListener('load', PrincipalReportes);
// tipoReporte.addEventListener('change', MostrarTabla);

