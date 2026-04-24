describe('Auth API', () => {
  it('GET /api/health returns ok', () => {
    cy.request('/api/health').then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.status).to.eq('ok');
    });
  });

  it('POST /api/auth/login with valid creds returns user + token', () => {
    cy.request('POST', '/api/auth/login', { email: 'rotem@example.com', password: 'password123' }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.include.keys('id', 'name', 'email', 'token');
      expect(res.body.token).to.be.a('string').and.not.be.empty;
      expect(res.body.email).to.eq('rotem@example.com');
    });
  });

  it('POST /api/auth/login with wrong password returns 401', () => {
    cy.request({ method: 'POST', url: '/api/auth/login', body: { email: 'rotem@example.com', password: 'wrong' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(401);
    });
  });

  it('POST /api/auth/register creates new user', () => {
    const email = `test_${Date.now()}@example.com`;
    cy.request('POST', '/api/auth/register', { name: 'Test User', email, password: 'test1234' }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.email).to.eq(email);
      expect(res.body.token).to.be.a('string');
    });
  });

  it('POST /api/auth/register with duplicate email returns 400', () => {
    cy.request({ method: 'POST', url: '/api/auth/register', body: { name: 'Dup', email: 'rotem@example.com', password: 'test1234' }, failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });
});
