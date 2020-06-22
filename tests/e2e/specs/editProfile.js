describe('Add caption', () => {
    before(() => {
      cy.visit('http://localhost:8080/login');
      cy.get('[data-type="email"]').clear().type('backuptestaccount@test.com');
      cy.get('[data-type="password"]').clear().type('backuptestaccount');

      cy.get('[type="submit"]').click();

    });
    it('Can add caption', () => {

        cy.wait(2000);
        cy.visit('http://localhost:8080/profile');
        cy.get('[data-type="edit-btn-playlist"]').click();
        cy.get('[data-type="playlist"]').clear().type('5TREJ3F2');
        cy.get('[type="submit"]').click();
    });
  })
  