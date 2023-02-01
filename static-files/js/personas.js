/**
 * Funciones en javascript para el cliente
 */
const SERVER = "http://localhost"
const PORT = "8001"

const DIV_LISTADO = "listado"

async function recuperaPersonas(callBackFn) {
    const url = SERVER + ":" + PORT + "/getPersonas"
    const response = await fetch(url);
    const vectorPersonas = await response.json()
    callBackFn(vectorPersonas.data)
}

// Mostrar como DIV
//const FN_CABECERA="personasCabeceraDIV"
//const FN_PERSONA="personaDIV"
//const FN_PIE="personasPieDIV"

// Mostrar como TABLA
const FN_CABECERA="personasCabeceraTABLE"
const FN_PERSONA="personaTR"
const FN_PIE="personasPieTABLE"

// Funciones para mostrar como DIV
function personasCabeceraDIV() {
    return "<div>";
}

function personaDIV( p ) {
    return `<div>
    <p><b>ID</b>: ${p.ref['@ref'].id}</p>
    <p><b>Nombre</b>: ${p.data.nombre}</p>
    <p><b>Apelidos</b>: ${p.data.apellidos}</p>
    <p><b>E-mail</b>: ${p.data.email}</p>
    <p><b>En plantilla desde</b>: ${p.data.año_entrada}</p>
    </div>
    `;
}
function personasPieDIV() {
    return "</div>";
}

// Funciones para mostrar como TABLE
function personasCabeceraTABLE() {
    return `<table class="listado-personas">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>eMail</th><th>Año contratación</th>
        </thead>
        <tbody>
    `;
}
function personaTR( p ) {
    return `<tr title="${p.ref['@ref'].id}">
    <td>${p.data.nombre}</td>
    <td>${p.data.apellidos}</td>
    <td>${p.data.email}</td>
    <td>${p.data.año_entrada}</td>
    </tr>
    `;
}
function personasPieTABLE() {
    return "</tbody></table>";
}



// Función que muestra todo el listado de personas en pantalla
function imprimePersonas(vector) {
    const div = document.getElementById(DIV_LISTADO);
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj="";
    msj+= eval(FN_CABECERA)();
    vector.forEach(e => msj += eval(FN_PERSONA)(e))
    msj += eval(FN_PIE)();
    div.innerHTML=msj;
}


// Función inicial para la página de listar
function main_listar() {
    recuperaPersonas(imprimePersonas);
    return true;
}
