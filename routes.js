// routes.js - routes for microservicio-1.

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");


/* Directotio para rutas estáticas */
router.use('/', express.static(__dirname + '/static-files'))

// Home page route.
router.get("/", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});

// Home page route.
router.get("/listar-personas", async (req, res) => {
    try {
        await callbacks.personas.listar(req, res)
    } catch (error) {
        console.log(error);
    }
});


/**
 * Recuperar de la llamada el ID de una persona concreta
 */
router.param("idPersona", (req, res, next, id) => {
    next();
});
  
/**
 * Mostrar datros de una persona concreta recuperada por su ID
 */
router.get("/mostrar-persona/:idPersona", async (req, res) => {
    try {
        await callbacks.personas.mostrar(req, res)
    } catch (error) {
        console.log(error);
    }
});

// Exporto el módulo para poder usarlo en server
module.exports = router;
