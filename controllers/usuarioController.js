const { body, param, validationResult } = require("express-validator");
const Usuario = require('../models/usuario');

module.exports = {
    // Obtener todos los usuarios
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

    // Obtener un usuario por ID con validación
    async getUsuario(req, res) {
        try {
            await param("id").isInt().withMessage("ID inválido").run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
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

    // Eliminar un usuario por ID con validación
    async deleteUsuario(req, res) {
        try {
            await param("id").isInt().withMessage("ID inválido").run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

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

    // Crear un nuevo usuario con validación y sanitización
    async createUser(req, res) {
        try {
            await Promise.all([
                body("nombre").trim().escape().notEmpty().withMessage("Nombre es requerido").run(req),
                body("email").isEmail().withMessage("Email inválido").run(req),
                body("password").isLength({ min: 8, max: 20 }).withMessage("Contraseña debe tener entre 8 y 20 caracteres").run(req)
            ]);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { nombre, email, password } = req.body;
            const usuario = await Usuario.findOrCreate({
                where: { email },
                defaults: {
                    nombre,
                    email,
                    password
                }
            });
            if (!usuario) {
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

    // Actualizar un usuario por ID con validación y sanitización
    async updateUsuario(req, res) {
        try {
            await param("id").isInt().withMessage("ID inválido").run(req);
            await Promise.all([
                body("nombre").optional().trim().escape().run(req),
                body("email").optional().isEmail().withMessage("Email inválido").run(req),
                body("password").optional().isLength({ min: 8, max: 20 }).withMessage("Contraseña debe tener entre 8 y 20 caracteres").run(req)
            ]);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const { nombre, email, password } = req.body;
            await Usuario.update({
                nombre,
                email,
                password
            }, {
                where: { id }
            });
            res.json({
                message: 'Usuario actualizado'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    // Autenticar un usuario con validación
    async loginUser(req, res) {
        try {
            await Promise.all([
                body("email").isEmail().withMessage("Email inválido").run(req),
                body("password").isLength({ min: 8, max: 20 }).withMessage("Contraseña debe tener entre 8 y 20 caracteres").run(req)
            ]);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;
            const usuario = await Usuario.findOne({ where: { email } });
            if (!usuario || usuario.password != password) {
                return res.status(401).json({
                    message: 'Credenciales inválidas'
                });
            }
            res.json(usuario.ID);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    }
};