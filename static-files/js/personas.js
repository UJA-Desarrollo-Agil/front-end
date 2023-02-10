/**
 * @file personas.js
 * @description Funciones para el procesamiento de la info enviada por el MS Personas
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */


/// Creo el espacio de nombres
let Personas = {};

/// Id del article en el que se debe escribir el listado de personas
Personas.ARTICLE_LISTAR = "personas-listar"

/// Id del div en el que se deben escribir los detalles de una persona
Personas.ARTICLE_MOSTRAR = "personas-mostrar"



// Mostrar como DIV: descomentar si se quiere mostrar como DIV y comentar las de TABLE
//Personas.FN_CABECERA="personasCabeceraDIV"
//Personas.FN_PERSONA="personaDIV"
//Personas.FN_PIE="personasPieDIV"

// Mostrar como TABLE: descomentar si se quiere mostrar como TABLE y comentar las de DIV
Personas.FN_CABECERA = "personasCabeceraTABLE"
Personas.FN_PERSONA = "personaTR"
Personas.FN_PIE = "personasPieTABLE"
/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Personas.recuperaPersonas = async function (callBackFn) {
    try {
        const url = FRONTEND.API_GATEWAY + "/personas/getTodas"
        const response = await fetch(url)
        if (response) {
            const vectorPersonas = response.json()
            callBackFn(vectorPersonas.data)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al microservicio Personas" )
        console.error(error)
        //throw error
    }
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Personas.recuperaUnaPersona = async function (callBackFn) {
    try {
        const idPersona = FRONTEND.recuperaParametro("id")
        const url = FRONTEND.API_GATEWAY + "/personas/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al microservicio Personas" )
        console.error(error)
    }
}


// Funciones para mostrar como DIV
/**
 * Cabecera del div
 * @returns Cadena con la cabecera del div
 */
Personas.personasCabeceraDIV = function () {
    return "<div>";
}

/**
 * Muestra todos los datos de la persona como un DIV
 * @param {persona} p Datos de la persona a mostrar 
 * @returns Cadena con los datos de la personas incluidos en un DIV
 */
Personas.personaDIV = function (p) {
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
Personas.personasPieDIV = function () {
    return "</div>";
}

// Funciones para mostrar como TABLE
/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Personas.personasCabeceraTABLE = function () {
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
Personas.personaTR = function (p) {
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
Personas.personasPieTABLE = function () {
    return "</tbody></table>";
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Personas.imprimePersonas = function (vector) {
    // La siguiente instrucción selecciona el primer elemento de clase seccion-principal-contenido que
    // haya dentro del elemento ARTICLE_LISTAR
    const div = document.getElementById(Personas.ARTICLE_LISTAR).getElementsByClassName("seccion-principal-contenido")[0];
    // console.log(vector) // Para comprobar lo que hay en vector
    let msj = "";
    msj += eval(FN_CABECERA)();
    vector.forEach(e => msj += eval(FN_PERSONA)(e))
    msj += eval(FN_PIE)();
    div.innerHTML = msj;
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Personas.imprimeUnaPersona = function (persona) {
    const div = document.getElementById(DIV_UNA_PERSONA);
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = "";
    msj += eval(FN_CABECERA)();
    msj += eval(FN_PERSONA)(persona);
    msj += eval(FN_PIE)();
    div.innerHTML = msj;
}


/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Personas.listar = function () {
    Personas.recuperaPersonas(Personas.imprimePersonas);
}


/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @returns True
 */
Personas.main_mostrar = function () {
    recuperaUnaPersona(imprimeUnaPersona);
    return true;
}
