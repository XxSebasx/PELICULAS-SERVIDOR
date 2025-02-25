const { pelicula, sequelize } = require('../models/relacion'); // Importamos el modelo de Película

describe('Pruebas de Película', () => {
    let peliculaId;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('Debe crear una película', async () => {
        const nuevaPelicula = await pelicula.create({
            titulo: 'Inception',
            anio_estreno: '2010-07-16',
            genero: 'otro',
            duracion: '148 min',
            portada: 'https://example.com/inception.jpg',
            trailer: 'https://example.com/inception-trailer.mp4',
            calificacion: 9
        });

        expect(nuevaPelicula).toHaveProperty('ID');
        expect(nuevaPelicula.titulo).toBe('Inception');
        peliculaId = nuevaPelicula.ID;
    });

    test('Debe eliminar una película', async () => {
        await pelicula.destroy({ where: { ID: peliculaId } });
        const peliculaEliminada = await pelicula.findByPk(peliculaId);
        expect(peliculaEliminada).toBeNull();
    });
});
