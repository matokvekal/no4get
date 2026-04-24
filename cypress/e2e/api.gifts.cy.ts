describe('Gifts API', () => {
  it('GET /api/gifts/suggest/:personId returns gift list', () => {
    cy.loginAndGetToken().then((token) => {
      cy.request({ method: 'GET', url: '/api/people', headers: { Authorization: `Bearer ${token}` } }).then((peopleRes) => {
        const personId = peopleRes.body[0].id;
        cy.request({ method: 'GET', url: `/api/gifts/suggest/${personId}`, headers: { Authorization: `Bearer ${token}` } }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.an('array').with.length.greaterThan(0);
          expect(res.body[0]).to.include.keys('id', 'name', 'price', 'image', 'description', 'category');
        });
      });
    });
  });

  it('GET /api/gifts/suggest with budget=50 only returns gifts <= $50', () => {
    cy.loginAndGetToken().then((token) => {
      cy.request({ method: 'GET', url: '/api/people', headers: { Authorization: `Bearer ${token}` } }).then((peopleRes) => {
        const personId = peopleRes.body[0].id;
        cy.request({ method: 'GET', url: `/api/gifts/suggest/${personId}?budget=50`, headers: { Authorization: `Bearer ${token}` } }).then((res) => {
          expect(res.status).to.eq(200);
          res.body.forEach((g: { price: number }) => expect(g.price).to.be.lte(50));
        });
      });
    });
  });

  it('GET /api/chat/init/:personId returns assistant welcome message', () => {
    cy.loginAndGetToken().then((token) => {
      cy.request({ method: 'GET', url: '/api/people', headers: { Authorization: `Bearer ${token}` } }).then((peopleRes) => {
        const personId = peopleRes.body[0].id;
        cy.request({ method: 'GET', url: `/api/chat/init/${personId}`, headers: { Authorization: `Bearer ${token}` } }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.role).to.eq('assistant');
          expect(res.body.content).to.be.a('string').and.not.be.empty;
          expect(res.body.id).to.be.a('string');
        });
      });
    });
  });

  it('POST /api/chat returns reply + updated gifts', () => {
    cy.loginAndGetToken().then((token) => {
      cy.request({ method: 'GET', url: '/api/people', headers: { Authorization: `Bearer ${token}` } }).then((peopleRes) => {
        const personId = peopleRes.body[0].id;
        cy.request({ method: 'POST', url: '/api/chat', headers: { Authorization: `Bearer ${token}` }, body: { personId, message: 'she loves cozy things', budget: 100 } }).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.reply).to.be.a('string').and.not.be.empty;
          expect(res.body.gifts).to.be.an('array');
        });
      });
    });
  });
});
