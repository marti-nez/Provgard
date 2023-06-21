'use strict';

const accesoRestringido = document.querySelectorAll('.noEncargadoUnidad');
const cerrarSesion = document.querySelector('cerrarSesion');
let filtro = document.getElementById("filtrarBitacora")
let tbody =  document.getElementById('tablaBitacoras')

let BitacoraFiltro = () =>{
let valorFiltro = filtro.value.toLowerCase()

for (let i = 0; i < tbody.rows.length; i++) {
    let fila = tbody.rows[i];
    let celda = fila.cells[0];
    let textoCelda = celda.textContent.toLowerCase();

    if (textoCelda.includes(valorFiltro)) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }

}} 

filtro.addEventListener("keyup", BitacoraFiltro)

const Acceso = () => {

    // Obtiene el objeto de usuario de localStorage
    let usuario = ObtenerSesionActiva();

    if (usuario.Rol == 3){
        for (let item of accesoRestringido) {
            item.classList.add('ocultar');
        }
    }
    return;
};


window.addEventListener('load', Acceso);
// cerrarSesion.addEventListener('click', LimpiarSesionActiva);

let listaDeBitacora = [];


GetListaBitacora();
async function GetListaBitacora(){
    let result = await ProcessGet('ListarBitacora', null);
    if (result != null && result.resultado == true) {
        listaDeBitacora = result.ListaBitacoraDB;
        ReporteDeBitacora();
        }
    else {
        ImprimirMsjError(result.msj);
        return;
    }
}

async function ReporteDeBitacora(){
    
    tbody.innerHTML = '';



    for (let i = 0; i < listaDeBitacora.length; i++) {        

        let fila = tbody.insertRow();
        let celdaMovimiento = fila.insertCell();
        let celdaFecha = fila.insertCell();
        let celdaUsuario = fila.insertCell();
        let celdaUsuarioID = fila.insertCell();
        let celdaUnidad = fila.insertCell();  
 
        celdaMovimiento.innerHTML = listaDeBitacora[i].TipoDeMovimiento;
        celdaFecha.innerHTML = listaDeBitacora[i].Fecha;
        celdaUsuario.innerHTML = listaDeBitacora[i].NombreDelUsuario;
        celdaUsuarioID.innerHTML = listaDeBitacora[i].UsuarioId;
        celdaUnidad.innerHTML = listaDeBitacora[i].Unidad;

    }}
