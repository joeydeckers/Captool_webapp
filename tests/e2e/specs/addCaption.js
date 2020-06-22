describe('Add caption', () => {
    before(() => {
      cy.visit('http://localhost:8080/login');
      cy.get('[data-type="email"]').clear().type('test3@gmail.com');
      cy.get('[data-type="password"]').clear().type('test123');

  
      cy.get('[type="submit"]').click();
      cy.wait(1500);
    });
    it('Can add caption', () => {
      cy.visit('http://localhost:8080/edit/caption/rpJSvjW5');
      cy.wait(1500);
      cy.get('#range-2').first().click({release:false}).trigger('mousemove', 1);
      cy.get('#__BVID__26').last().type('test caption');
      cy.get('#button').first().click();
    });
  })
  