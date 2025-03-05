const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const enlaceController = require('../controllers/enlaceController');
const sequelize = require('../config/database');
const carteleraRouter = require('../routers/carteleraRouter');

const app = express();
app.use(bodyParser.json());
app.use('/', carteleraRouter);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Enlace Controller', () => {
  it('should get all enlaces', async () => {
    const res = await request(app).get('/enlace');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});