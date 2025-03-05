const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comentario = sequelize.define('comentario', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    texto:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    idUsuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'ID'
        },
        onDelete: 'CASCADE'
    },
    idPelicula:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'peliculas',
            key: 'ID'
        },
        onDelete: 'CASCADE'
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    valoracion:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    rol:{
        type: DataTypes.ENUM('valoracion', 'respuesta'),
        allowNull: false,
        defaultValue: 'valoracion'
    }

}, {
    tableName: 'comentarios',
    timestamps: false
});

module.exports = Comentario;