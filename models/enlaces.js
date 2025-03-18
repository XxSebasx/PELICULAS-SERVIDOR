const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definición del modelo Enlace
const Enlace = sequelize.define('enlace', {
    // ID del enlace
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // ID de la película a la que pertenece el enlace
    peliculaID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'peliculas',
            key: 'ID'
        },
        onDelete: 'CASCADE'
    },
    plataforma:{
        type: DataTypes.ENUM('amazon', 'netflix', 'disney', 'hbo', 'movistar'),
        allowNull: false
    },
    enlace:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    }


}, {
    // Nombre de la tabla en la base de datos
    tableName: 'enlaces',
    // Desactivar timestamps automáticos
    timestamps: false
});

module.exports = Enlace;