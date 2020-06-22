describe('Login test fails', () => {
    before(() => {
      cy.visit('http://localhost:8080/login');
    });
    it('fails login', () => {
      cy.get('[data-type="email"]').clear().type('uioui');
      cy.get('[data-type="password"]').clear().type('ui');

      cy.get('[type="submit"]').click();
      cy.get('.error').first().contains('Vul een geldig email adres in');  
      cy.get('.error').last().contains('Het wachtwoord moet minimaal 6 karakters bevatten');  
    });
  })
  