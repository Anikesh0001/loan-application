import 'cypress-axe';

describe('App shell', () => {
  it('loads the home page and has no detectable a11y violations', () => {
    cy.visit('/');
    cy.contains('LendSwift').should('be.visible');
    cy.injectAxe();
    cy.checkA11y();
  });
});
