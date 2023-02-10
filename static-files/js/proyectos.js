/**
 * @file proyectos.js
 * @description Funciones para el procesamiento de la info enviada por el MS Proyectos
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */


/// Id del div en el que se debe escribir el listado de proyectos
const DIV_LISTADO = "listado"



/**
 * Función que recuperar todos los proyectos llamando al MS Proyectos
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
async function recuperaProyectos(callBackFn) {
    const url = Frontend.API_GATEWAY + "/proyectos/getTodos"
    const response = await fetch(url);
    const vectorProyectos = await response.json()
    callBackFn(vectorProyectos.data)
}

/**
 * Función que recuperar todos los proyectos junto con las personas asignadas a cada uno de ellos
 * llamando al MS Proyectos
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
async function recuperaProyectosConPersonas(callBackFn) {
    const url = Frontend.API_GATEWAY  + "/proyectos/getTodosConPersonas"
    const response = await fetch(url);
    const vectorProyectos = await response.json()
    callBackFn(vectorProyectos.data)
}

// Mostrar como DIV: descomentar si se quiere mostrar como DIV y comentar las de TABLE
//const FN_CABECERA="proyectosCabeceraDIV"
//const FN_Proyecto="proyectoDIV"
//const FN_PIE="proyectosPieDIV"

// Mostrar como TABLE: descomentar si se quiere mostrar como TABLE y comentar las de DIV
const FN_CABECERA="proyectosCabeceraTABLE"
const FN_Proyecto="proyectoTR"
const FN_ProyectoConPersonas="proyectoConPersonasTR"
const FN_PIE="proyectosPieTABLE"

/**
 * Cabecera del div
 * @returns Cadena con la cabecera del div
 */
function proyectosCabeceraDIV() {
    return "<div>";
}


/**
 * Muestra todos los datos del proyecto como un DIV
 * @param {persona} p Datos del proyecto a mostrar 
 * @returns ¡¡AUN SIN HACER!!
 * @todo Mostrar datos del proyecto como un DIV
 */
function proyectoDIV( p ) {
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
function proyectosPieDIV() {
    return "</div>";
}

// Funciones para mostrar como TABLE

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
function proyectosCabeceraTABLE() {
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
function proyectoTR( p ) {
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
function proyectoConPersonasTR( p ) {
    const d=p.data
    const ini=d.inicio;
    const fin=d.final;
    const presupuesto=Frontend.euros(d.presupuesto);
    let msj= eval(FN_CABECERA)();
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
    msj+=eval(FN_PIE)();
    return msj;
}

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
function proyectosPieTABLE() {
    return "</tbody></table>";
}



/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBDD.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
function imprimeProyectos(vector) {
    const div = document.getElementById(DIV_LISTADO);
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj="";
    msj+= eval(FN_CABECERA)();
    vector.forEach(e => msj += eval(FN_Proyecto)(e))
    msj += eval(FN_PIE)();
    div.innerHTML=msj;
}



/**
 * Función para mostrar en pantalla todos los proyectos que se han recuperado de la BBD, 
 * junto con las personas asignadas a los mismos.
 * @param {Vector_de_proyectos} vector Vector con los datos de los proyectos a mostrar
 */
function imprimeProyectosConPersonas(vector) {
    const div = document.getElementById(DIV_LISTADO);
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj="";
    vector.forEach(e => msj += eval(FN_ProyectoConPersonas)(e))
    div.innerHTML=msj;
}


/**
 * Función principal para recuperar los proyectos desde el MS y, posteriormente, imprimirlos.
 * @returns True
 */
function main_listar() {
    recuperaProyectos(imprimeProyectos);
    return true;
}

/**
 * Función principal para recuperar los proyectos, incluyendo las personas, desde el MS y, 
 * posteriormente, imprimirlos.
 * @returns True
 */
function main_listarConPersonas() {
    //recuperaProyectosConPersonas(imprimeProyectosConPersonas);
    recuperaProyectosConPersonas(imprimeProyectosConPersonas);
    return true;
}
