const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const peliculaController = require('../controllers/peliculaController');
const sequelize = require('../config/database');
const carteleraRouter = require('../routers/carteleraRouter');

const app = express();
app.use(bodyParser.json());
app.use('/', carteleraRouter);

beforeAll(async () => {
  await sequelize.sync({ force: false });
});

describe('Pelicula Controller', () => {
  it('should get all peliculas', async () => {
    const res = await request(app).get('/pelicula');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});