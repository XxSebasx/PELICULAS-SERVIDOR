const { body, param, validationResult } = require("express-validator");
const Pelicula = require('../models/pelicula');
const Comentario = require('../models/comentario');
const Usuario = require('../models/usuario');
const Enlace = require('../models/enlaces');

module.exports = {
    // Obtener todas las películas
    async getPeliculas(req, res) {
        try {
            const peliculas = await Pelicula.findAll();
            res.json(peliculas);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    // Eliminar una película por ID con validación
    async deletePelicula(req, res) {
        try {
            await param("id").isInt().withMessage("ID inválido").run(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const pelicula = await Pelicula.findByPk(id);
            if (!pelicula) {
                return res.status(404).json({
                    message: 'Pelicula no encontrada'
                });
            }
            await pelicula.destroy();
            res.json({
                message: 'Pelicula eliminada'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    // Obtener una película por nombre, fecha, director y genero con validación
    async getPelicula(req, res) {
        try {
            await Promise.all([
                param("titulo").isString().withMessage("Titulo inválido").run(req),
                param("anio_estreno").isDate().withMessage("Año de estreno inválido").run(req),
                param("director").isString().withMessage("Director inválido").run(req),
                param("genero").isString().withMessage("Género inválido").run(req)
            ]);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { titulo, anio_estreno, director, genero } = req.params;
            const pelicula = await Pelicula.findOne({ where: { titulo, anio_estreno, director, genero } });
            if (!pelicula) {
                return res.status(404).json({
                    message: 'Pelicula no encontrada'
                });
            }
            res.json(pelicula);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    // Crear una nueva película con validación
    async createPelicula(req, res) {
        try {
            await Promise.all([
                body("titulo").trim().escape().notEmpty().withMessage("Titulo es requerido").run(req),
                body("anio_estreno").isDate().withMessage("Año de estreno inválido").run(req),
                body("descripcion").trim().escape().notEmpty().withMessage("Descripción es requerida").run(req),
                body("director").trim().escape().notEmpty().withMessage("Director es requerido").run(req),
                body("genero").trim().escape().notEmpty().withMessage("Género es requerido").run(req),
                body("duracion").trim().escape().notEmpty().withMessage("Duración es requerida").run(req),
                body("portada").isURL().withMessage("URL de portada inválida").run(req),
                body("trailer").isURL().withMessage("URL de trailer inválida").run(req)
            ]);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const pelicula = await Pelicula.create(req.body);
            res.json(pelicula);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    async updatePelicula(req, res) {
        try {
            await Promise.all([
                body("titulo").trim().escape().notEmpty().withMessage("Titulo es requerido").run(req),
                body("anio_estreno").isDate().withMessage("Año de estreno inválido").run(req),
                body("descripcion").trim().escape().notEmpty().withMessage("Descripción es requerida").run(req),
                body("director").trim().escape().notEmpty().withMessage("Director es requerido").run(req),
                body("genero").trim().escape().notEmpty().withMessage("Género es requerido").run(req),
                body("duracion").trim().escape().notEmpty().withMessage("Duración es requerida").run(req),
                body("portada").isURL().withMessage("URL de portada inválida").run(req),
                body("trailer").isURL().withMessage("URL de trailer inválida").run(req)
            ]);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { id } = req.params;
            const pelicula = await Pelicula.findByPk(id);
            if (!pelicula) {
                return res.status(404).json({
                    message: 'Pelicula no encontrada'
                });
            }
            await pelicula.update(req.body);
            res.json(pelicula);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    async rankingPeliculas(req, res) {
        try {
            const peliculas = await Pelicula.findAll({
                order: [
                    ['valoracion', 'DESC']
                ]
            });
            res.json(peliculas);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    },

    //ranking por numero de comentarios asociados a la pelicula
    async rankingPopulares(req, res) {
        try {
            const peliculas = await Pelicula.findAll({
                include: [Comentario]
            });
            peliculas.sort((a, b) => b.comentarios.length - a.comentarios.length);
            res.json(peliculas);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    }
};