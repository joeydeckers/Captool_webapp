describe('Register test', () => {
  before(() => {
    cy.visit('http://localhost:8080/register');
  });
  it('Can register', () => {
    cy.get('[data-type="email"]').clear().type('test3@gmail.com');
    cy.get('[data-type="name"]').clear().type('Jowi');
    cy.get('[data-type="password"]').clear().type('test123');

    cy.get('[type="submit"]').click();
  });
})
