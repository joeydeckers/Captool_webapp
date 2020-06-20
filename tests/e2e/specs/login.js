describe('Login test', () => {
    before(() => {
      cy.visit('http://localhost:8080/login');
    });
    it('Can login', () => {
      cy.get('[data-type="email"]').clear().type('test3@gmail.com');
      cy.get('[data-type="password"]').clear().type('test123');

  
      cy.get('[type="submit"]').click();
    });
  })
  