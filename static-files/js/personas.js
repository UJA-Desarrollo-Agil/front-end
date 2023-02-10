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
//Personas.FN_CABECERA="Personas.personasCabeceraDIV"
//Personas.FN_PERSONA="Personas.personaDIV"
//Personas.FN_PIE="Personas.personasPieDIV"

// Mostrar como TABLE: descomentar si se quiere mostrar como TABLE y comentar las de DIV
Personas.FN_CABECERA = "Personas.personasCabeceraTABLE"
Personas.FN_PERSONA = "Personas.personaTR"
Personas.FN_PIE = "Personas.personasPieTABLE"
/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Personas.recuperaPersonas = async function (callBackFn) {
    let response=null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/personas/getTodas"
        response = await fetch(url)
       
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway" )
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas=null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Personas.recuperaUnaPersona = async function (callBackFn) {
    try {
        const idPersona = Frontend.recuperaParametro("id")
        const url = Frontend.API_GATEWAY + "/personas/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway" )
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
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro del DIV
    let msj = "";
    msj += eval(Personas.FN_CABECERA)();
    vector.forEach(e => msj += eval(Personas.FN_PERSONA)(e))
    msj += eval(Personas.FN_PIE)();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de personas", msj )
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Personas.imprimeUnaPersona = function (persona) {
    const div = document.getElementById(DIV_UNA_PERSONA);
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = "";
    msj += eval(Personas.FN_CABECERA)();
    msj += eval(Personas.FN_PERSONA)(persona);
    msj += eval(Personas.FN_PIE)();
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
}
