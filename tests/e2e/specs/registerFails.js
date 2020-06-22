describe('Register test fails', () => {
    before(() => {
      cy.visit('http://localhost:8080/register');
    });
    it('fails login', () => {
        cy.get('[data-type="email"]').clear().type('test3@gmail');
        cy.get('[data-type="name"]').clear().type('Jowi');
        cy.get('[data-type="password"]').clear().type('tes3');

      cy.get('[type="submit"]').click();
      cy.get('.error').first().contains('Vul een geldig email adres in');  
      cy.get('.error').last().contains('Het wachtwoord moet minimaal 6 karakters bevatten');  
    });
  })
  