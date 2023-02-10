/**
 * @file proyectos.js
 * @description Funciones para el procesamiento de la info enviada por el MS Proyectos
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */


/// Creo el espacio de nombres
let Proyectos = {};



/**
 * Función que recuperar todos los proyectos llamando al MS Proyectos
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Proyectos.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/proyectos/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        callBackFn(vectorProyectos.data)
    }
}

/**
 * Función que recuperar todos los proyectos junto con las personas asignadas a cada uno de ellos
 * llamando al MS Proyectos
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Proyectos.recuperaConPersonas = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/proyectos/getTodosConPersonas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        callBackFn(vectorProyectos.data)
    }
}


// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Proyectos.cabeceraTable = function () {
    return `<table class="listado-proyectos">
        <thead>
        <th>Alias</th><th>Nombre</th><th>Presupuesto</th><th>Desde</th><th>Hasta</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Proyectos.cuerpoTr = function (p) {
    const d = p.data
    const ini = d.inicio;
    const fin = d.final;
    const presupuesto = Frontend.euros(d.presupuesto);

    return `<tr title="${p.ref['@ref'].id}">
    <td>${d.alias}</td>
    <td><em>${d.nombre}</em></td>
    <td>${presupuesto}</td>
    <td>${ini.dia}/${ini.mes}/${ini.año}</td>
    <td>${fin.dia}/${fin.mes}/${fin.año}</td>
    </tr>
    `;
}


/**
 * Muestra la información de cada proyecto (incluyendo las personas asignadas) 
 * en varios elementos TR con sus correspondientes TD
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo los distintos elementos TR que muestran el proyecto.
 */
Proyectos.cuerpoConPersonasTr = function (p) {
    const d = p.data
    const ini = d.inicio;
    const fin = d.final;
    const presupuesto = Frontend.euros(d.presupuesto);
    let msj = Proyectos.cabeceraTable();
    msj += `<tr>
    <td>${d.alias}</td>
    <td><em>${d.nombre}</em></td>
    <td>${presupuesto}</td>
    <td>${ini.dia}/${ini.mes}/${ini.año}</td>
    <td>${fin.dia}/${fin.mes}/${fin.año}</td>
    </tr>
    <tr><th colspan="5">Personas</th></tr>
    <tr><td colspan="5">
        ${d.datos_personas
            .map(e => "<a href='javascript:Personas.mostrar(\"" + e.ref['@ref'].id + "\")'>"
                + e.data.nombre
                + " " + e.data.apellidos
                + "</a>")
            .join(", ")}
    </td></tr>
    `;
    msj += Proyectos.pieTable();
    return msj;
}

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Proyectos.pieTable = function () {
    return "</tbody></table>";
}



/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
Proyectos.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Proyectos.cabeceraTable();
    vector.forEach(e => msj += Proyectos.cuerpoTr(e))
    msj += Proyectos.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de proyectos", msj )

}



/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBD, 
 * junto con las personas asignadas a los mismos.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
Proyectos.imprimeConPersonas = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    vector.forEach(e => msj += Proyectos.cuerpoConPersonasTr(e))

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de proyectos con personas", msj )

}


/**
 * Función principal para recuperar los proyectos desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Proyectos.listar = function () {
    this.recupera(this.imprime);
}

/**
 * Función principal para recuperar los proyectos, incluyendo las personas, desde el MS y, 
 * posteriormente, imprimirlos.
 * @returns True
 */
Proyectos.listarConPersonas = function () {
    this.recuperaConPersonas(this.imprimeConPersonas);
}
