/**
 * @file personas.js
 * @description Funciones para el procesamiento de la info enviada por el MS Personas
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Personas = {};

/// Nombre de los campos del formulario para editar una persona
Personas.form = {
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
    EMAIL: "form-persona-email",
    ANIO: "form-persona-anio",
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Personas.personaMostrada = null

/// Plantilla para poner los datos de una persona en un TR
Personas.plantillaFormularioPersona = {}
Personas.plantillaFormularioPersona.tags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "EMAIL": "### EMAIL ###",
    "AÑO ENTRADA": "### AÑO ENTRADA ###",
}
Personas.plantillaFormularioPersona.cabecera = `<table class="listado-personas">
                    <thead>
                        <th width="5%">Id</th>
                        <th width="15%">Nombre</th>
                        <th width="15%">Apellidos</th>
                        <th width="10%">eMail</th>
                        <th width="5%">Año contratación</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody>
    `;
Personas.plantillaFormularioPersona.cuerpo = `         <tr title="${Personas.plantillaFormularioPersona.tags.ID}">
                            <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                                    value="${Personas.plantillaFormularioPersona.tags.ID}" /></td>
                            <td><input type="text" class="form-persona-elemento editable" disabled
                                    id="form-persona-nombre" required value="${Personas.plantillaFormularioPersona.tags.NOMBRE}" /></td>
                            <td><input type="text" class="form-persona-elemento editable" disabled
                                    id="form-persona-apellidos" value="### APELLIDOS ###" /></td>
                            <td><input type="email" class="form-persona-elemento editable" disabled
                                    id="form-persona-email" required value="### EMAIL ###" /></td>
                            <td><input type="number" class="form-persona-elemento editable" disabled
                                    id="form-persona-anio" min="1950" max="2030" required
                                    value="### AÑO ENTRADA ###" /></td>
                            <td>
                                <div class="opcion-secundaria"><a href="javascript:Personas.editar()">Editar</a></div>
                                <div class="opcion-terciaria editar"><a href="javascript:Personas.guardar()">Guardar</a>
                                </div>
                                <div class="opcion-terciaria editar"><a
                                        href="javascript:Personas.cancelar()">Cancelar</a></div>
                            </td>
                        </tr>
    `;
Personas.plantillaFormularioPersona.pie = `        </tbody>
             </table>
             `;

/**
     * Actualiza el cuerpo de la plantilla con los datos de la persona que se le pasa
     * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
     * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
     */
Personas.plantillaFormularioPersona.actualiza = function (persona) {
    // Utilizo expresiones regulares con el modificador 'g' para que cambie todas las apariciones de cada tag
    return this.cuerpo
        .replace(new RegExp(this.tags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(this.tags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(this.tags.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(this.tags.EMAIL, 'g'), persona.data.email)
        .replace(new RegExp(this.tags["AÑO ENTRADA"], 'g'), persona.data.año_entrada)
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
    return `< table class="listado-personas" >
        <thead>
        <th width="5%">Id</th>
        <th width="15%">Nombre</th>
        <th width="15%">Apellidos</th>
        <th width="10%">eMail</th>
        <th width="5%">Año contratación</th>
        <th>Acciones</th>
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
            <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id" value="${p.ref['@ref'].id}" /></td>
            <td><input type="text" class="form-persona-elemento editable" disabled id="form-persona-nombre" required value="${p.data.nombre}" /></td>
            <td><input type="text" class="form-persona-elemento editable" disabled id="form-persona-apellidos" value="${p.data.apellidos}" /></td>
            <td><input type="email" class="form-persona-elemento editable" disabled id="form-persona-email" required value="${p.data.email}" /></td>
            <td><input type="number" class="form-persona-elemento editable" disabled id="form-persona-anio"
                min="1950" max="2030"
                required value="${p.data.año_entrada}" /></td>
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
    return "</tbody></table > ";
}


/**
 * Imprime los datos de una persona como una tabla usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Personas.personaComoTable = function (persona) {
    return Personas.plantillaFormularioPersona.cabecera
        + Personas.plantillaFormularioPersona.actualiza(persona)
        + Personas.plantillaFormularioPersona.pie;
}


/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Personas.imprime = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Personas.plantillaFormularioPersona.cabecera
    vector.forEach(e => msj += Personas.plantillaFormularioPersona.actualiza(e))
    msj += Personas.plantillaFormularioPersona.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Personas.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Personas.personaComoTable(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Personas.almacenaDatos(persona)
}

/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Personas.almacenaDatos = function (persona) {
    Personas.personaMostrada = persona;
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */

Personas.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
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
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Personas.form) {
        document.getElementById(Personas.form[campo]).disabled = deshabilitando
    }
    return this
}


/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.deshabilitarCamposEditables = function () {
    Personas.habilitarDeshabilitarCamposEditables(true)
    return this
}


/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.habilitarCamposEditables = function () {
    Personas.habilitarDeshabilitarCamposEditables(false)
    return this
}


/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Personas.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}


/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Personas.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}


/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}


/**
 * Función que permite modificar los datos de una persona
 */
Personas.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
Personas.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()

}



