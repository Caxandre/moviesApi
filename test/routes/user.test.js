const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jwt-simple');

const app = require('../../src/app');

let user;

beforeEach(async () => {
  await app.parse;
});

describe('GET /users', () => {
  before(async () => {
    const res = await app.services.user.save({
      nome: 'user',
      email: `${Date.now()}@email.com`,
      password: '123456',
    });
    user = { ...res };
    user.token = jwt.encode(user, process.env.APP_SECRET);
  });
  it('Deve listar todos os usuários', (done) => {
    request(app).get('/users')
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.have.greaterThan(0);
        done();
      });
  });
});

describe('POST /users', () => {
  it('Deve inserir usuário com sucesso', (done) => {
    request(app).post('/users')
      .send({
        nome: 'John Doe2',
        email: `${Date.now()}@email.com`,
        password: '123456',
      })
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.contain.property('objectId');
        done();
      })
      .catch((err) => done(err));
  });

  it('Deve armazenar senha criptografada', async () => {
    const res = await request(app).post('/users')
      .send({
        nome: 'John Doe',
        email: `${Date.now()}@email.com`,
        password: '123456',
      })
      .set('authorization', `bearer ${user.token}`);
    expect(res.status).to.equal(201);

    const { objectId } = res.body;
    const userBD = await request(app).get(`/users/${objectId}`)
      .set('authorization', `bearer ${user.token}`);
    expect(userBD.body.password).to.not.equal('123456');
  });

  it('Não deve inserir usuário sem nome', (done) => {
    request(app).post('/users')
      .send({
        email: `${Date.now()}@email.com`,
        password: '123456',
      })
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Nome é um atributo obrigatório');
        done();
      });
  });

  it('Não deve inserir usuário sem email', (done) => {
    request(app).post('/users')
      .send({
        nome: 'John Doe2',
        password: '123456',
      })
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Email é um atributo obrigatório');
        done();
      });
  });

  it('Não deve inserir usuário sem senha', (done) => {
    request(app).post('/users')
      .send({
        nome: 'John Doe2',
        email: `${Date.now()}@email.com`,
      })
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Senha é um atributo obrigatório');
        done();
      });
  });
});
