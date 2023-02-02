/**
 * Funciones en javascript para el cliente
 */
const SERVER = "http://localhost"
const PORT = "8002"

const DIV_LISTADO = "listado"

async function recuperaProyectos(callBackFn) {
    const url = SERVER + ":" + PORT + "/getProyectos"
    const response = await fetch(url);
    const vectorProyectos = await response.json()
    callBackFn(vectorProyectos.data)
}


async function recuperaProyectosConPersonas(callBackFn) {
    const url = SERVER + ":" + PORT + "/getProyectosConPersonas"
    const response = await fetch(url);
    const vectorProyectos = await response.json()
    callBackFn(vectorProyectos.data)
}

// Mostrar como DIV
//const FN_CABECERA="proyectosCabeceraDIV"
//const FN_Proyecto="proyectoDIV"
//const FN_PIE="proyectosPieDIV"

// Mostrar como TABLA
const FN_CABECERA="proyectosCabeceraTABLE"
const FN_Proyecto="proyectoTR"
const FN_ProyectoConPersonas="proyectoConPersonasTR"

const FN_PIE="proyectosPieTABLE"

// Funciones para mostrar como DIV
function proyectosCabeceraDIV() {
    return "<div>";
}

function proyectoDIV( p ) {
    return `<div>
    <p><b>ID</b>: ${p.ref['@ref'].id}</p>
    <p><b>Alias</b>: ${p.data.alias}</p>
    <p><b>Nombre</b>: ${p.data.nombre}</p>
    <p><b>Presupuesto</b>: ${p.data.presupuesto}</p>
    <p><b>En plantilla desde</b>: ${p.data.anio_entrada}</p>
    </div>
    `;
}
function proyectosPieDIV() {
    return "</div>";
}

// Funciones para mostrar como TABLE
function proyectosCabeceraTABLE() {
    return `<table class="listado-proyectos">
        <thead>
        <th>Alias</th><th>Nombre</th><th>Presupuesto</th><th>Desde</th><th>Hasta</th>
        </thead>
        <tbody>
    `;
}
function proyectoTR( p ) {
    const d=p.data
    const ini=d.inicio;
    const fin=d.final;
    const presupuesto=(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(d.presupuesto));

    return `<tr title="${p.ref['@ref'].id}">
    <td>${d.alias}</td>
    <td><em>${d.nombre}</em></td>
    <td>${presupuesto}</td>
    <td>${ini.dia}/${ini.mes}/${ini.año}</td>
    <td>${fin.dia}/${fin.mes}/${fin.año}</td>
    </tr>
    `;
}
function proyectoConPersonasTR( p ) {
    const d=p.data
    const ini=d.inicio;
    const fin=d.final;
    const presupuesto=(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(d.presupuesto));

    return `<tr title="${p.ref['@ref'].id}">
    <td>${d.alias}</td>
    <td><em>${d.nombre}</em></td>
    <td>${presupuesto}</td>
    <td>${ini.dia}/${ini.mes}/${ini.año}</td>
    <td>${fin.dia}/${fin.mes}/${fin.año}</td>
    </tr>
    <tr><th colspan="5">Personas</th></tr>
    <tr><td colspan="5">${d.datos_personas.map(e=>e.data.nombre).join()}</td></tr>
    `;
}

function proyectosPieTABLE() {
    return "</tbody></table>";
}



// Función que muestra todo el listado de proyectos en pantalla
function imprimeProyectos(vector) {
    const div = document.getElementById(DIV_LISTADO);
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj="";
    msj+= eval(FN_CABECERA)();
    vector.forEach(e => msj += eval(FN_Proyecto)(e))
    msj += eval(FN_PIE)();
    div.innerHTML=msj;
}
// Función que muestra todo el listado de proyectos en pantalla incluyendo las personas que trabajan en él.
function imprimeProyectosConPersonas(vector) {
    const div = document.getElementById(DIV_LISTADO);
    console.log( vector ) // Para comprobar lo que hay en vector
    let msj="";
    msj+= eval(FN_CABECERA)();
    vector.forEach(e => msj += eval(FN_ProyectoConPersonas)(e))
    msj += eval(FN_PIE)();
    div.innerHTML=msj;
}


// Función inicial para la página de listar
function main_listar() {
    recuperaProyectos(imprimeProyectos);
    return true;
}
// Función inicial para la página de listar
function main_listarConPersonas() {
    //recuperaProyectosConPersonas(imprimeProyectosConPersonas);
    recuperaProyectosConPersonas(imprimeProyectosConPersonas);
    return true;
}
