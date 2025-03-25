const Pelicula = require('./pelicula');
const Usuario = require('./usuario');
const Comentario = require('./comentario');
const Enlace = require('./enlaces');

Pelicula.hasMany(Comentario, {foreignKey: 'idPelicula'});
Comentario.belongsTo(Pelicula, {foreignKey: 'idPelicula'});

Usuario.hasMany(Comentario, {foreignKey: 'idUsuario'});
Comentario.belongsTo(Usuario, {foreignKey: 'idUsuario'});

Pelicula.hasMany(Enlace, {foreignKey: 'peliculaID'});
Enlace.belongsTo(Pelicula, {foreignKey: 'peliculaID'});

module.exports = {
    Pelicula,
    Usuario,
    Comentario,
    Enlace
};