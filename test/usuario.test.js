const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const usuarioController = require('../controllers/usuarioController');
const sequelize = require('../config/database');
const carteleraRouter = require('../routers/carteleraRouter');

const app = express();
app.use(bodyParser.json());
app.use('/', carteleraRouter);

// Sincronizar la base de datos antes de ejecutar las pruebas
beforeAll(async () => {
  await sequelize.sync({ force: false });
});

describe('Usuario Controller', () => {
  // Prueba para obtener usuarios
  it('should get usuarios', async () => {
    const res = await request(app).get('/usuario');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});