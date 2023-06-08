/// <reference types="cypress" />

import { keyType } from 'src/app/shared/interfaces/StorageKeys';

describe('Logging In', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  }),
  it('el boton debe estar desabilitado', () => {


    const email = cy.get('input[type="email"]');
    const password = cy.get('input[type="password"]');

    // falta password
    email.type('pedro@test.com');
    cy.get('button[type="submit"]').should('be.disabled');
    email.clear();
    // falta email
    password.type('123456');
    cy.get('button[type="submit"]').should('be.disabled');
    password.clear();
    // password muy corta
    email.type('pedro@test.com');
    password.type('12345');
    cy.get('button[type="submit"]').should('be.disabled');
    // debe estar habilittado, todo ok
    password.type('123456');
    cy.get('button[type="submit"]').should('not.be.disabled');
    // no es un email
    email.clear().type('pedro');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('redirigir a registro', () => {
    const paginaActual= cy.url();
    cy.get('a').click();
    cy.url().should('not.include', paginaActual);
  });

  it('logear exitosamente ', () => {
    expect(localStorage.getItem(keyType.angularToken)).to.be.oneOf([null, '']);
    cy.url().should('include','login');

    cy.get('input[type="email"]').type('pedro@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include','login');

    // lamentablemene, tarda en aparecer el token, y falla este expect
    // expect(localStorage.getItem(keyType.angularToken)).to.not.be.oneOf([null, '']);

    cy.get('body')
      .should(() => {
        const waitSeconds = 2000;
        const step = 100;
        let token = null;
        for (let i = 0; i < waitSeconds; i += step) { // Reintentar durante 2 segundos (2000 milisegundos)
          token = localStorage.getItem(keyType.angularToken);
          if (token !== null && token !== '') {
            break; // Si el token no está vacío, salir del bucle
          }
          cy.wait(step); // Esperar 100 milisegundos antes de intentar nuevamente
        }
        expect(token).to.not.be.null; // Verificar que el token no sea nulo
        expect(token).to.not.be.empty; // Verificar que el token no esté vacío
      });

  });
});
