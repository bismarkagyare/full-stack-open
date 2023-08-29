describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173');
  });

  it('front page can be opened', function () {
    cy.contains('Blogs');
  });

  it('login form can be opened', function () {
    cy.contains('Login').click();
  });

  it('users can login', function () {
    cy.contains('Login').click();
    cy.get('#username').type('mark');
    cy.get('#password').type('bismark00');
    cy.get('#login-button').click();
    cy.contains('Bismark Agyare logged in');
  });
});
