const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const usuarioController = require('../controllers/usuarioController');
const sequelize = require('../config/database');
const carteleraRouter = require('../routers/carteleraRouter');

const app = express();
app.use(bodyParser.json());
app.use('/', carteleraRouter);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Usuario Controller', () => {
  it('should get all usuarios', async () => {
    const res = await request(app).get('/usuario');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});