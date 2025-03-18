const { body, param, validationResult } = require("express-validator");
const Enlace = require("../models/enlaces");
const Pelicula = require("../models/pelicula");

module.exports = {
    async createEnlace(req, res) {
        try {
            await body("peliculaID").isInt().withMessage("ID inválido").run(req);
            await body("plataforma").isIn(["amazon", "netflix", "disney", "hbo", "movistar"]).run(req);
            await body("enlace").isURL().run(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { peliculaID, plataforma, enlace } = req.body;
            const pelicula = await Pelicula.findByPk(peliculaID);
            if (!pelicula) {
                return res.status(404).json({
                    message: "Película no encontrada",
                });
            }

            const nuevoEnlace = await Enlace.create({
                peliculaID,
                plataforma,
                enlace,
            });

            res.status(201).json(nuevoEnlace);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error en el servidor",
            });
        }
    },

    async deleteEnlace(req, res) {
        try {
            await param("id").isInt().withMessage("ID inválido").run(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const enlace = await Enlace.findByPk(id);
            if (!enlace) {
                return res.status(404).json({
                    message: "Enlace no encontrado",
                });
            }

            await enlace.destroy();
            res.json({
                message: "Enlace eliminado",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error en el servidor",
            });
        }
    },

    async updateEnlace(req, res) {
        try {
            await param("id").isInt().withMessage("ID inválido").run(req);
            await body("plataforma").isIn(["amazon", "netflix", "disney", "hbo", "movistar"]).run(req);
            await body("enlace").isURL().run(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const enlace = await Enlace.findByPk(id);
            if (!enlace) {
                return res.status(404).json({
                    message: "Enlace no encontrado",
                });
            }

            const { plataforma, enlace: nuevoEnlace } = req.body;
            enlace.plataforma = plataforma;
            enlace.enlace = nuevoEnlace;
            await enlace.save();

            res.json(enlace);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error en el servidor",
            });
        }
    }
};