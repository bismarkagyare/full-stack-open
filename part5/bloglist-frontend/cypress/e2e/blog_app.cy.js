describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Login').click();
      cy.get('#username').type('mark');
      cy.get('#password').type('bismark00');
      cy.get('#login-button').click();
      cy.contains('Bismark Agyare logged in');
    });

    it('a new blog can be created', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('Learning about cypress');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('www.cypress.com');
      cy.get('#likes').type('6');
      cy.get('button:contains("create")').click();
      cy.contains('Learning about cypress');
    });
  });
});
