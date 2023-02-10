/**
 * @file proyectos.js
 * @description Funciones para el procesamiento de la info enviada por el MS Proyectos
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */


/// Creo el espacio de nombres
let Proyectos = {};

/// Id del article en el que se debe escribir el listado de personas
Proyectos.ARTICLE_LISTAR = "proyectos-listar"

/// Id del div en el que se deben escribir los detalles de una persona
Proyectos.ARTICLE_MOSTRAR = "proyectos-mostrar"


// Mostrar como DIV: descomentar si se quiere mostrar como DIV y comentar las de TABLE
// Proyectos.AFN_CABECERA="proyectosCabeceraDIV"
// Proyectos.AFN_Proyecto="proyectoDIV"
// Proyectos.AFN_PIE="proyectosPieDIV"

// Mostrar como TABLE: descomentar si se quiere mostrar como TABLE y comentar las de DIV
Proyectos.FN_CABECERA="Proyectos.proyectosCabeceraTABLE"
Proyectos.FN_Proyecto="Proyectos.proyectoTR"
Proyectos.FN_ProyectoConPersonas="Proyectos.proyectoConPersonasTR"
Proyectos.FN_PIE="Proyectos.proyectosPieTABLE"

/**
 * Función que recuperar todos los proyectos llamando al MS Proyectos
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Proyectos.recuperaProyectos=async function (callBackFn) {
    let response=null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/proyectos/getTodos"
        response = await fetch(url)
       
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway" )
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos=null
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
Proyectos.recuperaProyectosConPersonas=async function (callBackFn) {
    let response=null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY  + "/proyectos/getTodosConPersonas"
        response = await fetch(url)
       
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway" )
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos=null
    if (response) {
        vectorProyectos = await response.json()
        callBackFn(vectorProyectos.data)
    }
}

/**
 * Cabecera del div
 * @returns Cadena con la cabecera del div
 */
Proyectos.proyectosCabeceraDIV=function() {
    return "<div>";
}


/**
 * Muestra todos los datos del proyecto como un DIV
 * @param {persona} p Datos del proyecto a mostrar 
 * @returns ¡¡AUN SIN HACER!!
 * @todo Mostrar datos del proyecto como un DIV
 */
Proyectos.proyectoDIV=function( p ) {
    /*return `<div>
    <p><b>ID</b>: ${p.ref['@ref'].id}</p>
    <p><b>Alias</b>: ${p.data.alias}</p>
    <p><b>Nombre</b>: ${p.data.nombre}</p>
    <p><b>Presupuesto</b>: ${p.data.presupuesto}</p>
    <p><b>En plantilla desde</b>: ${p.data.anio_entrada}</p>
    </div>
    `;*/
    return "<div>SIN HACER</div>";
}

/**
 * Función para escribir el pie del DIV
 * @returns Pie del div
 */
Proyectos.proyectosPieDIV=function () {
    return "</div>";
}

// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Proyectos.proyectosCabeceraTABLE=function () {
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
Proyectos.proyectoTR=function ( p ) {
    const d=p.data
    const ini=d.inicio;
    const fin=d.final;
    const presupuesto=Frontend.euros(d.presupuesto);

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
Proyectos.proyectoConPersonasTR=function( p ) {
    const d=p.data
    const ini=d.inicio;
    const fin=d.final;
    const presupuesto=Frontend.euros(d.presupuesto);
    let msj= eval(Proyectos.FN_CABECERA)();
    msj+=`<tr>
    <td>${d.alias}</td>
    <td><em>${d.nombre}</em></td>
    <td>${presupuesto}</td>
    <td>${ini.dia}/${ini.mes}/${ini.año}</td>
    <td>${fin.dia}/${fin.mes}/${fin.año}</td>
    </tr>
    <tr><th colspan="5">Personas</th></tr>
    <tr><td colspan="5">
        ${d.datos_personas
            .map(e=>"<a href='/mostrar-persona.html?id="+e.ref['@ref'].id+"'>"
            +e.data.nombre
            +" "+e.data.apellidos
                +"</a>")
            .join(", ")}
    </td></tr>
    `;
    msj+=eval(Proyectos.FN_PIE)();
    return msj;
}

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Proyectos.proyectosPieTABLE=function() {
    return "</tbody></table>";
}



/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
Proyectos.imprimeProyectos=function(vector) {
    // La siguiente instrucción selecciona el primer elemento de clase seccion-principal-contenido que
    // haya dentro del elemento ARTICLE_LISTAR
    const div = document.getElementById(Personas.ARTICLE_LISTAR).getElementsByClassName("seccion-principal-contenido")[0];
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj="";
    msj+= eval(Proyectos.FN_CABECERA)();
    vector.forEach(e => msj += eval(Proyectos.FN_Proyecto)(e))
    msj += eval(Proyectos.FN_PIE)();
    div.innerHTML=msj;

     // Oculto TODOS los article menos el que quiero mostrar
     Frontend.ocultarTodosArticlesSalvo( Personas.ARTICLE_LISTAR )
}



/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBD, 
 * junto con las personas asignadas a los mismos.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
Proyectos.imprimeProyectosConPersonas=function(vector) {
    // La siguiente instrucción selecciona el primer elemento de clase seccion-principal-contenido que
    // haya dentro del elemento ARTICLE_LISTAR
    const div = document.getElementById(Personas.ARTICLE_LISTAR).getElementsByClassName("seccion-principal-contenido")[0];
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj="";
    vector.forEach(e => msj += eval(Proyectos.FN_ProyectoConPersonas)(e))
    div.innerHTML=msj;

     // Oculto TODOS los article menos el que quiero mostrar
     Frontend.ocultarTodosArticlesSalvo( Personas.ARTICLE_LISTAR )
}


/**
 * Función principal para recuperar los proyectos desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
Proyectos.listar=function() {
    this.recuperaProyectos(this.imprimeProyectos);
}

/**
 * Función principal para recuperar los proyectos, incluyendo las personas, desde el MS y, 
 * posteriormente, imprimirlos.
 * @returns True
 */
Proyectos.listarConPersonas=function() {
    //recuperaProyectosConPersonas(imprimeProyectosConPersonas);
    this.recuperaProyectosConPersonas(this.imprimeProyectosConPersonas);
}
