const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");
const enlaceController = require("../controllers/enlaceController");
const peliculaController = require("../controllers/peliculaController");
const usuarioController = require("../controllers/usuarioController");

//Comentario
router.post("/comentario", comentarioController.createComentario);
router.get("/comentario", comentarioController.getComentarios);
router.put("/comentario/:id", comentarioController.updateComentario);
router.delete("/comentario/:id", comentarioController.deleteComentario);

//Pelicula
router.post("/pelicula", peliculaController.createPelicula);
router.get("/pelicula", peliculaController.getPeliculas);
router.put("/pelicula/:id", peliculaController.updatePelicula);
router.delete("/pelicula/:id", peliculaController.deletePelicula);

//Enlace
router.post("/enlace", enlaceController.createEnlace);
router.get("/enlace", enlaceController.getEnlaces);
router.put("/enlace/:id", enlaceController.updateEnlace);
router.delete("/enlace/:id", enlaceController.deleteEnlace);

//Usuario
router.post("/usuario", usuarioController.createUser);
router.get("/usuario", usuarioController.getUsuarios);
router.put("/usuario/:id", usuarioController.updateUsuario);
router.delete("/usuario/:id", usuarioController.deleteUsuario);

//Relacion

module.exports = router;