const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enlace = sequelize.define('enlace', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    peliculaID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'peliculas',
            key: 'ID'
        },
        onDelete: 'CASCADE'
    },
    amazon:{
        type: DataTypes.STRING,
        validator: {
            isUrl: true
        }
    },
    netflix:{
        type: DataTypes.STRING,
        validator: {
            isUrl: true
        }
    },
    disney:{
        type: DataTypes.STRING,
        validator: {
            isUrl: true
        }
    },
    hbo:{
        type: DataTypes.STRING,
        validator: {
            isUrl: true
        }
    },
    movistar:{
        type: DataTypes.STRING,
        validator: {
            isUrl: true
        }
    },

}, {
    tableName: 'enlaces',
    timestamps: false
});

sequelize.sync({ force: true }).then(() => {
    console.log('Tabla enlaces sincronizada');
});

module.exports = Enlace;

