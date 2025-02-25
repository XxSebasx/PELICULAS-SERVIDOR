const { enlace, sequelize, pelicula } = require('../models/relacion'); // Importamos los modelos de Enlace y Película

describe('Pruebas de Enlace', () => {
    let peliculaId, enlaceId;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('Debe crear un enlace de película', async () => {
        const nuevaPelicula = await pelicula.create({
            titulo: 'Inception',
            anio_estreno: '2010-07-16',
            genero: 'otro',
            duracion: '148 min',
            portada: 'https://example.com/inception.jpg',
            trailer: 'https://example.com/inception-trailer.mp4',
            calificacion: 9
        });

        const nuevoEnlace = await enlace.create({
            peliculaID: nuevaPelicula.ID,
            amazon: 'https://amazon.com/inception',
            netflix: 'https://netflix.com/inception'
        });

        expect(nuevoEnlace).toHaveProperty('ID');
        expect(nuevoEnlace.peliculaID).toBe(nuevaPelicula.ID);
        enlaceId = nuevoEnlace.ID;
        peliculaId = nuevaPelicula.ID;
    });

    test('Debe eliminar un enlace', async () => {
        await enlace.destroy({ where: { ID: enlaceId } });
        const enlaceEliminado = await enlace.findByPk(enlaceId);
        expect(enlaceEliminado).toBeNull();
    });
});
