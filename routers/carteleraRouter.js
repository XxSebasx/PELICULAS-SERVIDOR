const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");
const enlaceController = require("../controllers/enlaceController");
const peliculaController = require("../controllers/peliculaController");
const usuarioController = require("../controllers/usuarioController");

//Comentario
router.post("/comentario", comentarioController.createComentario);
router.get("/comentario/:id", comentarioController.getComentarios);
router.delete("/comentario/:id", comentarioController.deleteComentario);

//Pelicula
router.post("/pelicula", peliculaController.createPelicula);
router.get("/pelicula", peliculaController.getPeliculas);
router.delete("/pelicula/:id", peliculaController.deletePelicula);
router.get("/pelicula/:id", peliculaController.getPelicula);

//Enlace
router.post("/enlace", enlaceController.createEnlace);
router.delete("/enlace/:id", enlaceController.deleteEnlace);

//Usuario
router.post("/usuario", usuarioController.createUser);
router.get("/usuario", usuarioController.getUsuarios);
router.delete("/usuario/:id", usuarioController.deleteUsuario);
router.post("/login", usuarioController.loginUser);
router.get("/usuario/:id", usuarioController.getUsuario);

module.exports = router;