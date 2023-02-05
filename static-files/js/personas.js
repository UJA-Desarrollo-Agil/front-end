/**
 * @file personas.js
 * @description Funciones para el procesamiento de la info enviada por el MS Personas
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */


/// Dirección del MS que funciona como API_GATEWAY
const API_GATEWAY = "http://localhost:8001"

/// Id del div en el que se debe escribir el listado de personas
const DIV_LISTADO = "listado"

/// Id del div en el que se deben escribir los detalles de una persona
const DIV_UNA_PERSONA = "detalles"

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
async function recuperaPersonas(callBackFn) {
    const url = API_GATEWAY  + "/personas/getTodas"
    const response = await fetch(url);
    const vectorPersonas = await response.json()
    callBackFn(vectorPersonas.data)
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
async function recuperaUnaPersona(callBackFn) {
    const url = API_GATEWAY  + "/personas/getPorId/354047536357441750"
    const response = await fetch(url);
    const persona = await response.json()
    callBackFn(persona)
}
// Mostrar como DIV: descomentar si se quiere mostrar como DIV y comentar las de TABLE
//const FN_CABECERA="personasCabeceraDIV"
//const FN_PERSONA="personaDIV"
//const FN_PIE="personasPieDIV"

// Mostrar como TABLE: descomentar si se quiere mostrar como TABLE y comentar las de DIV
const FN_CABECERA="personasCabeceraTABLE"
const FN_PERSONA="personaTR"
const FN_PIE="personasPieTABLE"

// Funciones para mostrar como DIV
/**
 * Cabecera del div
 * @returns Cadena con la cabecera del div
 */
function personasCabeceraDIV() {
    return "<div>";
}

/**
 * Muestra todos los datos de la persona como un DIV
 * @param {persona} p Datos de la persona a mostrar 
 * @returns Cadena con los datos de la personas incluidos en un DIV
 */
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

/**
 * Función para escribir el pie del DIV
 * @returns Pie del div
 */
function personasPieDIV() {
    return "</div>";
}

// Funciones para mostrar como TABLE
/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
function personasCabeceraTABLE() {
    return `<table class="listado-personas">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>eMail</th><th>Año contratación</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada persona en un elemento TR con sus correspondientes TD
 * @param {persona} p Datos de la persona a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra la persona.
 */
function personaTR( p ) {
    return `<tr title="${p.ref['@ref'].id}">
    <td>${p.data.nombre}</td>
    <td>${p.data.apellidos}</td>
    <td>${p.data.email}</td>
    <td>${p.data.año_entrada}</td>
    </tr>
    `;
}

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
function personasPieTABLE() {
    return "</tbody></table>";
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
 
function imprimePersonas(vector) {
    const div = document.getElementById(DIV_LISTADO);
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj="";
    msj+= eval(FN_CABECERA)();
    vector.forEach(e => msj += eval(FN_PERSONA)(e))
    msj += eval(FN_PIE)();
    div.innerHTML=msj;
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */
 
function imprimeUnaPersona(persona) {
    const div = document.getElementById(DIV_UNA_PERSONA);
    console.log( persona ) // Para comprobar lo que hay en vector
    let msj="";
    msj+= eval(FN_CABECERA)();
    msj += eval(FN_PERSONA)(persona);
    msj += eval(FN_PIE)();
    div.innerHTML=msj;
}


/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 * @returns True
 */
function main_listar() {
    recuperaPersonas(imprimePersonas);
    return true;
}


/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @returns True
 */
function main_mostrar() {
    recuperaUnaPersona(imprimeUnaPersona);
    return true;
}
