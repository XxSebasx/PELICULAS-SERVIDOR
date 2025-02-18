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

}, {
    tableName: 'comentarios',
    timestamps: false
});


sequelize.sync({ force: true }).then(() => {
    console.log('Tabla comentarios sincronizada');
});

module.exports = Comentario;

