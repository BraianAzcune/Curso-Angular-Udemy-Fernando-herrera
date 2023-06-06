/// <reference types="cypress" />

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
    expect(localStorage.getItem('token-angular')).to.equal('');
    const paginaActual= cy.url();

    cy.get('input[type="email"]').type('pedro@test.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', paginaActual);
    expect(localStorage.getItem('token-angular')).to.not.equal('');

  });
});
