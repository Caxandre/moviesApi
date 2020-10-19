const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jwt-simple');
const app = require('../../src/app');

let user;

beforeEach(async () => {
  await app.parse;
});

describe('GET /movies', () => {
  before(async () => {
    const res = await app.services.user.save({
      nome: 'user',
      email: `${Date.now()}@email.com`,
      password: '123456',
    });
    user = { ...res };
    user.token = jwt.encode(user, process.env.APP_SECRET);
  });

  it('Deve listar todos os filmes', (done) => {
    request(app).get('/movies')
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.have.greaterThan(0);
        done();
      });
  });

  it('Deve retornar um determinado filme', async () => {
    const res = await request(app).post('/movies')
      .send({
        titulo: 'teste',
        descricao: 'my test',
        poster: 'test@example.com',
        data_lancamento: '01/10/2020',
      })
      .set('authorization', `bearer ${user.token}`);
    expect(res.status).to.equal(201);

    const { objectId } = res.body;
    const movie = await request(app).get(`/movies/${objectId}`)
      .set('authorization', `bearer ${user.token}`);

    expect(movie.status).to.equal(200);
    expect(movie.body).to.contain.property('titulo');
  });
});

describe('POST /movies', () => {
  it('Deve inserir filme com sucesso', (done) => {
    request(app).post('/movies')
      .send({
        titulo: 'teste',
        descricao: 'my test',
        poster: 'test@example.com',
        data_lancamento: '01/10/2020',
      })
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.contain.property('objectId');
        expect(res.body.titulo).to.equal('teste');
        done();
      })
      .catch((err) => done(err));
  });
});

describe('PUT /movies', () => {
  it('Deve atualizar filme com sucesso', async () => {
    const res = await request(app).post('/movies')
      .send({
        titulo: 'novo filme',
        descricao: 'novo filme',
        poster: 'test@example.com',
        data_lancamento: '01/10/2020',
      })
      .set('authorization', `bearer ${user.token}`);
    expect(res.status).to.equal(201);

    const { objectId } = res.body;
    const movieBD = await request(app).put(`/movies/${objectId}`)
      .send({
        titulo: 'filme atualizado',
        descricao: 'filme atualizado',
        poster: 'poster atualizado',
        data_lancamento: '05/10/2020',
      })
      .set('authorization', `bearer ${user.token}`);

    expect(movieBD.body.titulo).to.equal('filme atualizado');
    expect(movieBD.body.descricao).to.equal('filme atualizado');
    expect(movieBD.body.poster).to.equal('poster atualizado');
    expect(movieBD.body.data_lancamento).to.equal('05/10/2020');
  });
});
