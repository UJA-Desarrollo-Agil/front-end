/**
 * @file proyectos-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Proyectos en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */


// SPECS para Jasmine
describe("Pie table ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Proyectos.pieTable()).toBe("</tbody></table>");
        });
});

describe("cuerpoConPersonasTr ", function () {

    // Preparo los datos
    let d = {
        inicio: { dia: 123, mes: 245, año: 3024 }
        , final: { dia: 467, mes: 589, año: 6023 }
        , presupuesto: 1000
        , alias: "el alias del proyecto"
        , nombre: "el nombre del proyecto"
        , datos_personas: [
            {
                ref: {
                    "@ref": {
                        id: "ref persona 1"
                    }
                },
                data: {
                    nombre: "Nombre persona 1",
                    apellidos: "Apellidos persona 1"
                }
            },
            {
                ref: {
                    "@ref": {
                        id: "ref persona 2"
                    }
                },
                data: {
                    nombre: "Nombre persona 2",
                    apellidos: "Apellidos persona 2"
                }
            },

        ]
    }

    let p = { data: d }

    // Realizo los expect
    it("debería una fila de tabla con los datos de un proyecto con personas asociadas",
        function () {
            let msj = Proyectos.cuerpoConPersonasTr(p)
            expect(msj.includes(d.inicio.dia)).toBeTrue();
            expect(msj.includes(d.inicio.mes)).toBeTrue();
            expect(msj.includes(d.inicio.año)).toBeTrue();
            expect(msj.includes(d.final.dia)).toBeTrue();
            expect(msj.includes(d.final.mes)).toBeTrue();
            expect(msj.includes(d.final.año)).toBeTrue();
            expect(msj.includes(Frontend.euros(d.presupuesto))).toBeTrue();
            expect(msj.includes(d.alias)).toBeTrue();
            expect(msj.includes(d.nombre)).toBeTrue();
            for (let i = 0; i < d.datos_personas.length; ++i) {
                let persona = d.datos_personas[i]
                expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
                expect(msj.includes(persona.data.nombre)).toBeTrue();
                expect(msj.includes(persona.data.apellidos)).toBeTrue();
            }

        });
});
