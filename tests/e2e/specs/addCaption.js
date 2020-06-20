describe('Add caption', () => {
    before(() => {
      cy.visit('http://localhost:8080/login');
      cy.get('[data-type="email"]').clear().type('test3@gmail.com');
      cy.get('[data-type="password"]').clear().type('test123');

    
        cy.get('[type="submit"]').click();
        cy.wait(500);

    });
    it('Can add caption', () => {


      cy.visit('http://localhost:8080/dashboard');
      cy.visit('http://localhost:8080/caption/1');
    });
  })
  