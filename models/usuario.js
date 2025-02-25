const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validator: {
            len: [8, 20],
            isAlphanumeric: true
        }
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    rol:{
        type: DataTypes.ENUM('admin', 'usuario'),
        allowNull: false,
        defaultValue: 'usuario'
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

sequelize.sync({ force: true }).then(() => {
    console.log('Tabla usuarios sincronizada');
});

module.exports = Usuario;

