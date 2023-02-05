// callbacks.js - callbacks for microservicio-1.
// CALLBACKS DEL MODELO

const SEND_FILE_OPTIONS = { root: (__dirname + '/static-files') }


// Permitir CORS
function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}
// CALLBACKS ADICIONALES
const CB_OTHERS = {
    home: async (req, res) => {
        try {
            res.sendFile("/index.html",
                SEND_FILE_OPTIONS,
                function (err) {
                    if (err) {
                        console.error(err);
                    }
                })
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    }
}

const CB_PERSONAS = {
    personas: {
        listar: async (req, res) => {
            try {
                CORS(res).res.sendFile("/listar-personas.html",
                    SEND_FILE_OPTIONS,
                    function (err) {
                        if (err) {
                            console.error(err);
                        }
                    })
            } catch (error) {
                res.status(500).json({ error: error.description })
            }
        },
        mostrar: async (req, res) => {
            try {
                CORS(res).res.sendFile("/mostrar-persona.html",
                    SEND_FILE_OPTIONS,
                    function (err) {
                        if (err) {
                            console.error(err);
                        }
                    })
            } catch (error) {
                res.status(500).json({ error: error.description })
            }
        },
    }
} 

const CB_PROYECTOS = {
    proyectos: {
        listar: async (req, res) => {
            try {
                CORS(res).res.sendFile("/listar-proyectos.html",
                    SEND_FILE_OPTIONS,
                    function (err) {
                        if (err) {
                            console.error(err);
                        }
                    })
            } catch (error) {
                res.status(500).json({ error: error.description })
            }
        },
        proyectosConPersonas: async (req, res) => {
            try {
                CORS(res).res.sendFile("/listar-proyectos-con-personas.html",
                    SEND_FILE_OPTIONS,
                    function (err) {
                        if (err) {
                            console.error(err);
                        }
                    })
            } catch (error) {
                res.status(500).json({ error: error.description })
            }
        },
    },

} 
// Une todos los callbacks en un solo objeto.
// OJO: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
// el último que haya sobreescribe a todos los anteriores.
exports.callbacks = {  ...CB_OTHERS, ...CB_PERSONAS }
