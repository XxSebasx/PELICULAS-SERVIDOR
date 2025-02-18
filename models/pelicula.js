const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Pelicula = sequelize.define('Pelicula', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    anio_estreno:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    genero: {
        type: DataTypes.ENUM('hombre', 'mujer', 'otro'),
        allowNull: false,
    },
    duracion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    portada:{
        type: DataTypes.STRING,
        allowNull: false,
        validator: {
            isUrl: true
        }
    },
    trailer:{
        type: DataTypes.STRING,
        allowNull: false,
        validator: {
            isUrl: true
        }
    },
    calificacion:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'clientes',
    timestamps: false
});


sequelize.sync({ force: true }).then(() => {
    console.log('Tabla peliculas sincronizada');
});

module.exports = Pelicula;
