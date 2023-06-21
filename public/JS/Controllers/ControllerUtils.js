'use strict';


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
function ResaltarLabelInvalido(plabelID) {
    var obj = document.getElementById(plabelID);
    var orig = obj.style;
    obj.style = 'color:red;'

    setTimeout(function () {
        obj.style = orig;
    }, 5000);
}
function ResaltarInputInvalido(pinputID) {
    var obj = document.getElementById(pinputID);
    var orig = obj.style;
    obj.style = 'border: 1px solid red;'

    setTimeout(function () {
        obj.style = orig;
    }, 5000);
}