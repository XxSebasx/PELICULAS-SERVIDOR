const { body, param, validationResult } = require("express-validator");
const Comentario = require("../models/comentario");
const Usuario = require("../models/usuario");

module.exports = {
  // Obtener comentarios con validación
  async getComentarios(req, res) {
    try {
      // Validar el ID de la película (debe ser numérico)
      await param("id").isInt().run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { idPelicula } = req.params;

      // Consulta segura con Sequelize
      const comentarios = await Comentario.findAll({
        where: { idPelicula },
        include: [{ model: Usuario }],
      });

      res.json(comentarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  },

  // Crear un comentario con validación de datos
  async createComentario(req, res) {
    try {
      // Validar y sanitizar la entrada
      await Promise.all([
        body("idPelicula").isInt().withMessage("ID de película inválido").run(req),
        body("idUsuario").isInt().withMessage("ID de usuario inválido").run(req),
        body("valoracion").isInt().withMessage("Valoración inválida").run(req),
        body("texto").trim().escape().notEmpty().run(req),
      ]);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { idPelicula, idUsuario, texto } = req.body;

      // Crear comentario de forma segura
      const comentarioDB = await Comentario.create({ idPelicula, idUsuario, texto, valoracion });

      res.json(comentarioDB);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  },

  // Eliminar un comentario con validación
  async deleteComentario(req, res) {
    try {
      // Validar ID del comentario
      await param("id").isInt().withMessage("ID inválido").run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;

      // Buscar comentario
      const comentario = await Comentario.findByPk(id);
      if (!comentario) {
        return res.status(404).json({ message: "Comentario no encontrado" });
      }

      // Eliminar comentario
      await comentario.destroy();
      res.json({ message: "Comentario eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  },
};