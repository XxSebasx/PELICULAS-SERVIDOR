require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const sequelize = require('./config/database');
require('./models/relacion');

app.use(helmet());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const carteleraRouter = require("./routers/carteleraRouter");
app.use("/", carteleraRouter);

sequelize.authenticate()
    .then(() => console.log('Conexión exitosa con la base de datos'))
    .catch((error) => console.error('Error conectando a la base de datos:', error));

// Cambia force: true a force: false o elimínalo por completo
sequelize.sync({ force: false })
    .then(() => console.log('Modelos sincronizados con la base de datos'))
    .catch((error) => console.error('Error sincronizando modelos:', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});