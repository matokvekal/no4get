describe('Orders API', () => {
  it('GET /api/orders returns orders list', () => {
    cy.loginAndGetToken().then((token) => {
      cy.request({ method: 'GET', url: '/api/orders', headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array');
        if (res.body.length > 0) {
          expect(res.body[0]).to.include.keys('id', 'userId', 'personId', 'personName', 'giftId', 'giftName', 'price', 'date', 'status');
        }
      });
    });
  });

  it('POST /api/orders/checkout creates orders from basket items', () => {
    cy.loginAndGetToken().then((token) => {
      cy.request({ method: 'GET', url: '/api/people', headers: { Authorization: `Bearer ${token}` } }).then((peopleRes) => {
        const personId = peopleRes.body[0].id;
        const personName = peopleRes.body[0].name;
        const items = [{ giftId: 'g1', giftName: 'Lush Spa Gift Set', giftImage: 'https://picsum.photos/seed/spa/400/300', price: 65, personId, personName }];
        cy.request({ method: 'POST', url: '/api/orders/checkout', headers: { Authorization: `Bearer ${token}` }, body: { items } }).then((res) => {
          expect(res.status).to.eq(201);
          expect(res.body).to.be.an('array').with.length(1);
          expect(res.body[0].status).to.eq('paid');
          expect(res.body[0].giftId).to.eq('g1');
          expect(res.body[0].price).to.eq(65);
        });
      });
    });
  });

  it('POST /api/orders/checkout with empty items returns 400', () => {
    cy.loginAndGetToken().then((token) => {
      cy.request({ method: 'POST', url: '/api/orders/checkout', headers: { Authorization: `Bearer ${token}` }, body: { items: [] }, failOnStatusCode: false }).then((res) => {
        expect(res.status).to.eq(400);
      });
    });
  });
});
