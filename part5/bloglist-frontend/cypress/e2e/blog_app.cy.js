describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173');
    cy.contains('Login').click();
    cy.get('#username').type('mark');
    cy.get('#password').type('bismark00');
    cy.get('#login-button').click();
    cy.contains('Bismark Agyare logged in');
  });

  describe('creating a new blog', function () {
    beforeEach(function () {
      cy.contains('New Blog').click();
    });

    it('succeeds with valid data', function () {
      cy.get('#title').type('Learning about cypress');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('www.cypress.com');
      cy.get('#likes').type('6');
      cy.get('button:contains("create")').click();
      cy.contains('Learning about cypress');
    });
  });
});
