/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend={};


/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/**
 * BUsca el nombre de un parámetro pasado por la URL, con el formato ?nombreParametro=valor
 * @param {String} nombreParametro 
 * @returns El valor del parámetro si existe; si no, devuelve NULL
 */
Frontend.recuperaParametro=function (nombreParametro) {
    const cad = location.search.substring(1);
    const params=[]
    if (cad.length) {
        let parejas = [];
        parejas = cad.split("&");
        for (let i = 0; i < parejas.length; ++i) {
            const par = parejas[i].split("=");
            params[par[0]] = par[1]
                .replace(/\+/g, " ")
                .replace(/%3A/g, ":")
                .replace(/%2C/g, ",");
        }
    }
    return (typeof params[nombreParametro]==="undefined")?NULL:params[nombreParametro]
}



/**
 * Devuelve una cantidad con formato de moneda en euros, es decir: N.NNN.NNN,NN€
 * @param {número} cantidad Cantidad que hay que devolver formateada
 * @returns La misma cantidad, pero con formato de euros.
 */
Frontend.euros=function ( cantidad ) {
    return (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(cantidad));
}

/**
 * Oculta todos los article
 */
Frontend.ocultarTodosArticles=function () {
    const articles=document.getElementsByClassName( "seccion-principal" );
    for( let i=0; i<articles.length; ++i ) {
        let cadenaClase = articles[i].getAttribute( "class")
        // Quito los espacios en blanco y la cadena "mostrar" y "ocultar"
        cadenaClase=cadenaClase.split(" ").filter(e=>e).filter(e=>e!="mostrar" && e!="ocultar").join(" ")
        // Añado la cadena ocultar
        cadenaClase+=" ocultar"
        articles[i].setAttribute( "class", cadenaClase )
    }
}
/**
 * Oculta todos los article menos el del ID que le pasamos
 */
Frontend.ocultarTodosArticlesSalvo=function ( idArticle ) {
    Frontend.ocultarTodosArticles();
    let cadenaClase=document.getElementById( idArticle ).getAttribute( "class" )
    // Quito la cadena "ocultar" y añado "mostrar"
    cadenaClase=cadenaClase.replace("ocultar","")+"mostrar"
    document.getElementById( idArticle ).setAttribute( "class", cadenaClase )
}