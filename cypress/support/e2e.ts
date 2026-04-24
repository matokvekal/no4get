// Reusable login command — fetches a fresh token each time (simple + reliable)
Cypress.Commands.add('loginAndGetToken', () => {
  return cy
    .request('POST', '/api/auth/login', { email: 'rotem@example.com', password: 'password123' })
    .its('body.token');
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginAndGetToken(): Chainable<string>;
    }
  }
}
