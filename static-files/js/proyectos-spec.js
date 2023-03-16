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