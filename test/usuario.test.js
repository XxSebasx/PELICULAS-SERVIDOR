const { usuario, sequelize } = require('../models/relacion'); // Importamos el modelo de Usuario

describe('Pruebas de Usuario', () => {
    let usuarioId;

    beforeAll(async () => {
        // Sincronizamos la base de datos antes de las pruebas
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        // Cerramos la conexión con la base de datos después de las pruebas
        await sequelize.close();
    });

    test('Debe crear un usuario', async () => {
        const nuevoUsuario = await usuario.create({
            nombre: 'Juan Pérez',
            email: 'juan@example.com',
            password: 'password123',
            rol: 'usuario'
        });

        expect(nuevoUsuario).toHaveProperty('ID');
        expect(nuevoUsuario.nombre).toBe('Juan Pérez');
        usuarioId = nuevoUsuario.ID;
    });

    test('Debe eliminar un usuario', async () => {
        await usuario.destroy({ where: { ID: usuarioId } });
        const usuarioEliminado = await usuario.findByPk(usuarioId);
        expect(usuarioEliminado).toBeNull();
    });
});
