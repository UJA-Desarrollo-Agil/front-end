/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};


/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/// Algunas constantes relacionadas con CSS y HTML
Frontend.CLASS_MOSTRAR = "mostrar"
Frontend.CLASS_OCULTAR = "ocultar"

Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"


/**
 * Devuelve una cantidad con formato de moneda en euros, es decir: N.NNN.NNN,NN€
 * @param {número} cantidad Cantidad que hay que devolver formateada
 * @returns La misma cantidad, pero con formato de euros.
 */
Frontend.euros = function (cantidad) {
    return (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cantidad));
}


/// Objeto dentro Frontend para tratar con el contenido de Article
Frontend.Article = {}

/**
 * Borrar titulo del article
 * @returns Frontend.Article para poder concatenar llamadas
 */
Frontend.Article.borrarTitulo = function () {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML = "";
    return this;
}
/**
 * Borrar contenido del article
 * @returns Frontend.Article para poder concatenar llamadas
 */
Frontend.Article.borrarContenido = function () {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML = "";
    return this;
}

/**
 * Borrar titulo y contenido del article
 * @returns Frontend para poder concatenar llamadas 
 */
Frontend.Article.borrar = function () {
    return this.borrarTitulo().borrarContenido();
}

/**
 * Añadir info al titulo del article
 * @param {string} Texto Nuevo texto (en formato HTML) a añadir
 * @returns Frontend para poder concatenar llamadas 
 */
Frontend.Article.aniadirTitulo = function (texto) {
    texto = texto || ""
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML += "\n" + texto;
    return this;
}

/**
 * Añadir info al contenido del article
 * @param {string} Texto Nuevo texto (en formato HTML) a añadir
 * @returns Frontend para poder concatenar llamadas 
 */
Frontend.Article.aniadirContenido = function (texto) {
    
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML += "\n" + texto;
    return this;
}


/**
 * Quita a un elemento del cual se pasa él mismo o su ID la clase indicada por nombreClase
 * @param {string} elemento Elemento o id del elemento
 * @param {string} nombreClase Nombre de la clase a quitar
 */
Frontend.quitarClase = function (elemento, nombreClase) {
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase?clase:""
    clase = clase.split(" ") // Separo la cadena por " "
        .filter(e => e) // Quito las cadenas vacías que pudiera haber
        .filter(e => e != nombreClase) // Quito la cadena indicada por nombreClase
        .join(" ") // creo una sola cadena con todas las clases separadas por espacios
    elemento.setAttribute("class", clase)

    return this;
}

/**
 * Añade a un elemento del cual se pasa él mismo o su ID la clase indicada por nombreClase
 * @param {string} elemento Elemento o id del elemento
 * @param {string} nombreClase Nombre de la clase a quitar
 */
Frontend.aniadirClase = function (elemento, nombreClase) {
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase?clase:""
    clase = clase.split(" ") // Separo la cadena por " "
        .filter(e => e) // Quito las cadenas vacías que pudiera haber
        .filter(e => e != nombreClase) // Quito la cadena indicada por nombreClase, por si ya estuviera
        .concat(nombreClase) // Añado la clase indicada en nombreClase
        .join(" ") // creo una sola cadena con todas las clases separadas por espacios
    elemento.setAttribute("class", clase)

    return this;
}

/**
 * Muestro el article
 * @returns El propio Article para poder concatenar llamadas
 */
Frontend.Article.mostrar = function () {
    let article = document.getElementById(Frontend.ID_SECCION_PRINCIPAL);
    Frontend.quitarClase(Frontend.ID_SECCION_PRINCIPAL, Frontend.CLASS_OCULTAR)
        .aniadirClase(Frontend.ID_SECCION_PRINCIPAL, Frontend.CLASS_MOSTRAR)

}
/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    titulo = titulo || ""
    contenido = contenido || ""
    this.borrar()
        .aniadirTitulo(titulo)
        .aniadirContenido(contenido)
        .mostrar()
    return this;
}