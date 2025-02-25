
const Comentario = require("../models/comentario");
const Usuario = require("../models/usuario");

module.exports = {
  async getComentarios(req, res) {
    try {
      const { idPelicula } = req.params;
      const comentarios = await Comentario.findAll({
        where: { idPelicula },
        include: [{ model: Usuario }],
      });
      res.json(comentarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error en el servidor",
      });
    }
  },

  async createComentario(req, res) {
    try {
      const { idPelicula, idUsuario, texto } = req.body;
      const comentarioDB = await Comentario.create({
        idPelicula,
        idUsuario,
        texto,
      });
      res.json(comentarioDB);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error en el servidor",
      });
    }
  },

  async updateComentario(req, res) {
    try {
      const { id } = req.params;
      const comentario = await Comentario.findByPk(id);
      if (!comentario) {
        return res.status(404).json({
          message: "Comentario no encontrado",
        });
      }
      await comentario.update(req.body);
      res.json(comentario);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error en el servidor",
      });
    }
  }
};
