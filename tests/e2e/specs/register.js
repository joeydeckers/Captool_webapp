describe('Register test', () => {
  before(() => {
    cy.visit('http://localhost:8080/register');
  });
  it('Can register', () => {
    cy.get('[data-type="email"]').clear().type('testesttest123@gmail.com');
    cy.get('[data-type="name"]').clear().type('Jowi');
    cy.get('[data-type="password"]').clear().type('testesttest');

    cy.get('[type="submit"]').click();
  });
})
