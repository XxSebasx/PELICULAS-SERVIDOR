const Pelicula = require('../models/pelicula');

module.exports = {
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

    async deletePelicula(req, res) {
        try {
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


    async getPelicula (req,res){
        try {
            const {id} = req.params;
            const pelicula = await Pelicula.findByPk(id);
            if(!pelicula){
                return res.status(404).json({
                    message: 'Pelicula no encontrada'
                });
            }
            res.json(pelicula)
        } catch (error) {
            
        }
    }
}