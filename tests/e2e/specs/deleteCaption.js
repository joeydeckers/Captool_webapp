describe('Delete caption', () => {
    before(() => {
      cy.visit('http://localhost:8080/login');
      cy.get('[data-type="email"]').clear().type('test3@gmail.com');
      cy.get('[data-type="password"]').clear().type('test123');

  
      cy.get('[type="submit"]').click();
      cy.wait(1500);
    });
    it('Can delete caption', () => {
      cy.visit('http://localhost:8080/edit/caption/rpJSvjW5');
      cy.wait(1500);
      cy.get('#__BVID__21').clear().type('2');
      cy.get('#__BVID__23').clear().type('test caption');
      cy.get('.delete-btn').first().click();
    });
  })
  