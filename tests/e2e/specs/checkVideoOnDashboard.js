describe('Check video on dashboard', () => {
    before(() => {
      cy.visit('http://localhost:8080/login');
      cy.get('[data-type="email"]').clear().type('test3@gmail.com');
      cy.get('[data-type="password"]').clear().type('test123');
  
      cy.get('[type="submit"]').click();
    });

    it('Can Check video', () => {
      beforeEach(() => {
        cy.visit('http://localhost:8080/dashboard');
        cy.get('.title').contains('Crab Rave')  // Yield el in .nav containing 'About'
      })
    });
})
  