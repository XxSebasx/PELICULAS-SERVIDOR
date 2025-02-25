const Comentario = require("../models/comentario");
const Usuario = require("../models/usuario");
const Pelicula = require("../models/pelicula");
const Enlace = require("../models/enlace");

module.exports = {
    async getEnlaces(req,res){
        try{
            const { idPelicula } = req.params;
            const enlaces = await Enlace.findAll({
                where: { peliculaID: idPelicula },
                include: [{ model: Pelicula, as: 'pelicula' }]
            });
            res.json(enlaces);
        } catch (error){
            console.error(error);
            res.status(500).json({
                message: "Error en el servidor"
            });
        }
    },
    async createEnlace(req, res){
        try{
            const { peliculaID, amazon, netflix, disney, hbo, movistar } = req.body;
            const enlaceDB = await Enlace.create({
                peliculaID,
                amazon,
                netflix,
                disney,
                hbo,
                movistar
            });
            res.json(enlaceDB);
        } catch (error){
            console.error(error);
            res.status(500).json({
                message: "Error en el servidor"
            });
        }
    },
    async updateEnlace(req, res){
        try{
            const { id } = req.params;
            const enlace = await Enlace.findByPk(id);
            if(!enlace){
                return res.status(404).json({
                    message: "Enlace no encontrado"
                });
            }
            await enlace.update(req.body);
            res.json(enlace);
        } catch (error){
            console.error(error);
            res.status(500).json({
                message: "Error en el servidor"
            });
        }
    },

    async deleteEnlace(req, res){
        try{
            const { id } = req.params;
            const enlace = await Enlace.findByPk(id);
            if(!enlace){
                return res.status(404).json({
                    message: "Enlace no encontrado"
                });
            }
            await enlace.destroy();
            res.json({ message: "Enlace eliminado" });
        } catch (error){
            console.error(error);
            res.status(500).json({
                message: "Error en el servidor"
            });
        }
    }
}