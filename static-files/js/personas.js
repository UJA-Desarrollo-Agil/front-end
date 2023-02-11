/**
 * @file personas.js
 * @description Funciones para el procesamiento de la info enviada por el MS Personas
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */


/// Creo el espacio de nombres
let Personas = {};

/// Nombre de los campos del formulario para editar una persona
Personas.form = {
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
    EMAIL: "form-persona-email",
    ANIO: "form-persona-anio",
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Personas.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/personas/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Personas.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/personas/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}


// Funciones para mostrar como TABLE
/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Personas.cabeceraTABLE = function () {
    return `<table class="listado-personas">
        <thead>
        <th>Id</th><th>Nombre</th><th>Apellidos</th><th>eMail</th><th>Año contratación</th><th>Acciones</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada persona en un elemento TR con sus correspondientes TD
 * @param {persona} p Datos de la persona a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra la persona.
 */
Personas.cuerpoTr = function (p) {
    return `<tr title="${p.ref['@ref'].id}">
    <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id" value="${p.ref['@ref'].id}"/></td>
    <td><input type="text" class="form-persona-elemento editable" disabled id="form-persona-nombre" required value="${p.data.nombre}"/></td>
    <td><input type="text" class="form-persona-elemento editable" disabled id="form-persona-apellidos"  value="${p.data.apellidos}"/></td>
    <td><input type="text" class="form-persona-elemento editable" disabled id="form-persona-email"  required value="${p.data.email}"/></td>
    <td><input type="text" class="form-persona-elemento editable" disabled id="form-persona-anio"  required value="${p.data.año_entrada}"/></td>
    <td>
        <div class="opcion-secundaria"><a href="javascript:Personas.editar()">Editar</a></div>
        <div class="opcion-terciaria editar"><a href="javascript:Personas.guardar()">Guardar</a></div>
        <div class="opcion-terciaria editar"><a href="javascript:Personas.cancelar()">Cancelar</a></div>
    </td>
    </tr>
    `;
}

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Personas.pieTable = function () {
    return "</tbody></table>";
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Personas.imprime = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = ""
    msj += Personas.cabeceraTABLE()
    vector.forEach(e => msj += Personas.cuerpoTr(e))
    msj += Personas.pieTable()

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Personas.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Personas.cabeceraTABLE();
    msj += Personas.cuerpoTr(persona);
    msj += Personas.pieTable();
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)
}


/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Personas.listar = function () {
    Personas.recupera(Personas.imprime);
}


/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
Personas.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}


/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.habilitarCamposEditables = function () {
    for (let campo in Personas.form) {
        document.getElementById(Personas.form[campo]).disabled = false
    }
    return this
}


/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Personas.ocultarOpcionesSecundarias = function () {
    let opciones = document.getElementsByClassName("opcion-secundaria")
    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], Frontend.CLASS_MOSTRAR)
            .aniadirClase(opciones[i], Frontend.CLASS_OCULTAR)
    }
    return this
}

/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.mostrarOcionesTerciariasEditar = function () {
    Personas.ocultarOpcionesSecundarias()
    let opciones = document.getElementsByClassName("opcion-terciaria editar")
    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], Frontend.CLASS_OCULTAR)
            .aniadirClase(opciones[i], Frontend.CLASS_MOSTRAR)
    }
    return this
}


/**
 * Función que permite modificar los datos de una persona
 */
Personas.editar = function () {
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}