const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

describe('GET /', () => {
  it('Deve responder na raiz', () => {
    return request(app).get('/')
      .then((res) => {
        expect(res.status).to.equal(200);
      });
  });
});
