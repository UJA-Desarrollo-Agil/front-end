/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js de MS Proyectos
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */

const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');


/**
 * Test para las rutas "estáticas": / y /acerdade
 */

describe('Servidor Front-End:', () => {
    it('La ruta / debe devolver el fichero index.html', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(function (res) {
          //console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.text.includes('<h1>Aplicación Personas-Proyectos</h1>'));
          assert(res.text.includes('<article id="seccion-principal" class="ocultar">'));

        })
        .end((error) => { error ? done.fail(error) : done() })
    });

    it('Cualquier otra ruta, como : /patata/consome/zanahoria también index.html', (done) => {
      supertest(app)
        .get('/patata/consome/zanahoria')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(function (res) {
          //console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.text.includes('<h1>Aplicación Personas-Proyectos</h1>'));
          assert(res.text.includes('<article id="seccion-principal" class="ocultar">'));

        })
        .end((error) => { error ? done.fail(error) : done() })
    });

    it('Cualquier otro acceso a html, como : /miperro.html devuelve también index.html', (done) => {
      supertest(app)
        .get('/miperro.html')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(function (res) {
          //console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.text.includes('<h1>Aplicación Personas-Proyectos</h1>'));
          assert(res.text.includes('<article id="seccion-principal" class="ocultar">'));

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Cualquier otro tipo de fichero, como : /assets/img.png devuelve también index.html', (done) => {
      supertest(app)
        .get('/miperro.html')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(function (res) {
          //console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.text.includes('<h1>Aplicación Personas-Proyectos</h1>'));
          assert(res.text.includes('<article id="seccion-principal" class="ocultar">'));

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })
