const pelicula = require('./pelicula');
const usuario = require('./usuario');
const comentario = require('./comentario');
const enlace = require('./enlace');

pelicula.hasMany(comentario, {foreignKey: 'idPelicula'});
comentario.belongsTo(pelicula, {foreignKey: 'idPelicula'});

usuario.hasMany(comentario, {foreignKey: 'idUsuario'});
comentario.belongsTo(usuario, {foreignKey: 'idUsuario'});

pelicula.hasOne(enlace, {foreignKey: 'peliculaID'});
enlace.belongsTo(pelicula, {foreignKey: 'peliculaID'});

module.exports = {
    pelicula,
    usuario,
    comentario,
    enlace
};