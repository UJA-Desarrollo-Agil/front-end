// callbacks.js - callbacks for microservicio-1.
// CALLBACKS DEL MODELO

const SEND_FILE_OPTIONS = { root: (__dirname + '/static-files') }

// CALLBACKS ADICIONALES
const CB_OTHERS = {
    home: async (req, res) => {
        try {
            console.log( "index")
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
    },

}

// Une todos los callbacks en un solo objeto.
// OJO: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
// el último que haya sobreescribe a todos los anteriores.
exports.callbacks = {  ...CB_OTHERS }
