const { body, param, validationResult } = require("express-validator");
const Comentario = require("../models/comentario");
const Usuario = require("../models/usuario");
const Pelicula = require("../models/pelicula");
const Enlace = require("../models/enlaces");

module.exports = {
    // Obtener enlaces de una película
    async getEnlaces(req, res) {
        try {
            // Validar ID de película
            await param("idPelicula").isInt().withMessage("ID de película inválido").run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { idPelicula } = req.params;
            const enlaces = await Enlace.findAll({
                where: { peliculaID: idPelicula },
                include: [{ model: Pelicula, as: "pelicula" }],
            });

            res.json(enlaces);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    },

    // Crear un nuevo enlace con validación de datos
    async createEnlace(req, res) {
        try {
            // Validar y sanitizar la entrada
            await Promise.all([
                body("peliculaID").isInt().withMessage("ID de película inválido").run(req),
                body("amazon").optional().trim().escape().isURL().withMessage("URL inválida").run(req),
                body("netflix").optional().trim().escape().isURL().withMessage("URL inválida").run(req),
                body("disney").optional().trim().escape().isURL().withMessage("URL inválida").run(req),
                body("hbo").optional().trim().escape().isURL().withMessage("URL inválida").run(req),
                body("movistar").optional().trim().escape().isURL().withMessage("URL inválida").run(req),
            ]);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { peliculaID, amazon, netflix, disney, hbo, movistar } = req.body;

            // Crear enlace de forma segura
            const enlaceDB = await Enlace.create({ peliculaID, amazon, netflix, disney, hbo, movistar });

            res.json(enlaceDB);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    },

    // Actualizar un enlace con validaciones
    async updateEnlace(req, res) {
        try {
            // Validar ID
            await param("id").isInt().withMessage("ID inválido").run(req);

            // Validar y sanitizar campos opcionales
            await Promise.all([
                body("amazon").optional().trim().escape().isURL().run(req),
                body("netflix").optional().trim().escape().isURL().run(req),
                body("disney").optional().trim().escape().isURL().run(req),
                body("hbo").optional().trim().escape().isURL().run(req),
                body("movistar").optional().trim().escape().isURL().run(req),
            ]);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const { amazon, netflix, disney, hbo, movistar } = req.body;

            // Buscar enlace
            const enlace = await Enlace.findByPk(id);
            if (!enlace) {
                return res.status(404).json({ message: "Enlace no encontrado" });
            }

            // Actualizar solo si hay cambios
            await enlace.update({ amazon, netflix, disney, hbo, movistar });

            res.json(enlace);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    },

    // Eliminar un enlace con validación
    async deleteEnlace(req, res) {
        try {
            // Validar ID
            await param("id").isInt().withMessage("ID inválido").run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const enlace = await Enlace.findByPk(id);
            if (!enlace) {
                return res.status(404).json({ message: "Enlace no encontrado" });
            }

            await enlace.destroy();
            res.json({ message: "Enlace eliminado" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    },
};
