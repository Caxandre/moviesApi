const request = require('supertest');
const { expect } = require('chai');

const app = require('../../src/app');

describe('POST /users', () => {
  it('Deve criar novo usuário via signup', (done) => {
    const email = `${Date.now()}@email.com`;
    request(app).post('/auth/signup')
      .send({ nome: 'John Doe2', email, password: '123456' })
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.nome).to.equal('John Doe2');
        expect(res.body).to.contain.property('email');
        done();
      });
  });

  it('Deve receber token ao logar', (done) => {
    const email = `${Date.now()}@email.com`;
    app.services.user.save({
      nome: 'John Doe2',
      email,
      password: '123456',
    })
      .then(() => request(app).post('/auth/signin')
        .send({ email, password: '123456' }))
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.contain.property('token');
        done();
      });
  });

  it('Não deve autenticar usuario com senha errada', (done) => {
    const email = `${Date.now()}@email.com`;
    app.services.user.save({
      nome: 'John Doe2',
      email,
      password: '123456',
    })
      .then(() => request(app).post('/auth/signin')
        .send({ email, password: '654321' }))
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Usuário ou senha não encontrados');
        done();
      });
  });

  it('Não deve autenticar usuario inexistente', (done) => {
    request(app).post('/auth/signin')
      .send({ email: 'inexistente@email.com', password: '654321' })
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Usuário ou senha não encontrados');
        done();
      });
  });

  it('Não deve acessar uma rota protegida sem token', (done) => {
    request(app).get('/users')
      .then((res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});
