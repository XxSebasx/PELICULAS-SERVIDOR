const Usuario = require('../models/usuario');

module.exports = {
    async getUsuarios(req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                });
            }
            await usuario.destroy();
            res.json({
                message: 'Usuario eliminado'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    async createUser(req, res) {
        try {
            const { nombre, email, password } = req.body;
            const usuario = await Usuario.findOrCreate({
                where: { email },
                defaults: {
                    nombre,
                    email,
                    password
                }
            })
            if(!usuario){
                return res.status(400).json({
                    message: 'El usuario ya existe'
                });
            }
            res.json(usuario);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },
};