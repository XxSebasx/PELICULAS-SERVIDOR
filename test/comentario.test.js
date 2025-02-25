const { comentario, sequelize, usuario, pelicula } = require('../models/relacion'); // Importamos los modelos de Comentario, Usuario y Película

describe('Pruebas de Comentarios', () => {
    let usuarioId, peliculaId, comentarioId;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('Debe crear un comentario', async () => {
        const nuevoUsuario = await usuario.create({
            nombre: 'Juan Pérez',
            email: 'juan@example.com',
            password: 'password123',
            rol: 'usuario'
        });

        const nuevaPelicula = await pelicula.create({
            titulo: 'Inception',
            anio_estreno: '2010-07-16',
            genero: 'otro',
            duracion: '148 min',
            portada: 'https://example.com/inception.jpg',
            trailer: 'https://example.com/inception-trailer.mp4',
            calificacion: 9
        });

        const nuevoComentario = await comentario.create({
            texto: 'Excelente película',
            idUsuario: nuevoUsuario.ID,
            idPelicula: nuevaPelicula.ID,
            rol: 'valoracion'
        });

        expect(nuevoComentario).toHaveProperty('ID');
        expect(nuevoComentario.texto).toBe('Excelente película');
        comentarioId = nuevoComentario.ID;
        usuarioId = nuevoUsuario.ID;
        peliculaId = nuevaPelicula.ID;
    });

    test('Debe eliminar un comentario', async () => {
        await comentario.destroy({ where: { ID: comentarioId } });
        const comentarioEliminado = await comentario.findByPk(comentarioId);
        expect(comentarioEliminado).toBeNull();
    });
});
