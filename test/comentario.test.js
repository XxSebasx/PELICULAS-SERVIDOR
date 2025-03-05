const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const comentarioController = require('../controllers/comentarioController');
const sequelize = require('../config/database');
const carteleraRouter = require('../routers/carteleraRouter');

const app = express();
app.use(bodyParser.json());
app.use('/', carteleraRouter);

beforeAll(async () => {
  await sequelize.sync({ force: false });
});

describe('Comentario Controller', () => {
  it('should get all comentarios', async () => {
    const res = await request(app).get('/comentario');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});