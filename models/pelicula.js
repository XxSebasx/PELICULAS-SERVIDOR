const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definición del modelo Pelicula
const Pelicula = sequelize.define('Pelicula', {
    // ID de la película
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Título de la película
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    // Año de estreno de la película
    anio_estreno:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    // Descripción de la película
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    // Director de la película
    director:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    // Género de la película
    genero: {
        type: DataTypes.ENUM('psicologico', 'sobrenatural', 'gore', 'gotico', 'slasher', 'ciencia ficcion', 'thriller', 'horror cosmico' ),
        allowNull: false,
    },
    // Duración de la película
    duracion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    // URL de la portada de la película
    portada:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    // URL del trailer de la película
    trailer:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    },
    valoracion:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    },
    director:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    // Nombre de la tabla en la base de datos
    tableName: 'peliculas',
    // Desactivar timestamps automáticos
    timestamps: false
});

module.exports = Pelicula;