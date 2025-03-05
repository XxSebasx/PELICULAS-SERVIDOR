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
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    director:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
    genero: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    duracion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    portada:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    trailer:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    calificacion:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
        defaultValue: 0
    },
}, {
    tableName: 'peliculas',
    timestamps: false
});

module.exports = Pelicula;
