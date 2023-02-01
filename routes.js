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

// About page route.
router.get("/about", async (req, res) => {
    try {
        await callbacks.about(req, res)
    } catch (error) {
        console.log(error);
    }
});




// Exporto el módulo para poder usarlo en server
module.exports = router;
