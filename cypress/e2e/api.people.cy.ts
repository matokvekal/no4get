describe('People API', () => {
  it('GET /api/people returns list of people', () => {
    cy.loginAndGetToken().then((token) => {
      cy.request({ method: 'GET', url: '/api/people', headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array').with.length.greaterThan(0);
        expect(res.body[0]).to.include.keys('id', 'userId', 'name', 'birthdate', 'eventType', 'nextEventDate', 'daysUntil');
      });
    });
  });

  it('GET /api/people daysUntil is always >= 0', () => {
    cy.loginAndGetToken().then((token) => {
      cy.request({ method: 'GET', url: '/api/people', headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        res.body.forEach((p: { daysUntil: number }) => expect(p.daysUntil).to.be.gte(0));
      });
    });
  });

  it('POST /api/people adds a person', () => {
    cy.loginAndGetToken().then((token) => {
      cy.request({ method: 'POST', url: '/api/people', headers: { Authorization: `Bearer ${token}` }, body: { name: 'Cypress Friend', birthdate: '1995-06-10', eventType: 'birthday' } }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.name).to.eq('Cypress Friend');
        expect(res.body.id).to.be.a('string');
        expect(res.body.daysUntil).to.be.gte(0);
      });
    });
  });

  it('GET /api/people without token returns 401', () => {
    cy.request({ method: 'GET', url: '/api/people', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });
});
