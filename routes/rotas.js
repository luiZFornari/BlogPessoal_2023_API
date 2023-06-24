const { Router } = require("express");

const PublicacoesController = require("../controllers/publicacoesController");
const UsuarioController = require("../controllers/userController");
const ComentarioController = require("../controllers/comentarioController");
const { login, verificaJWT } = require("../controllers/segurancaController");

const rotas = new Router();

rotas
  .route("/publicacoes")
  .get(PublicacoesController.getPublicacoes)
  .post(verificaJWT, PublicacoesController.addPublicacao)
  .put(verificaJWT, PublicacoesController.updatePublicacao);

rotas
  .route("/publicacoes/:codigo")
  .get(PublicacoesController.getPublicacaoPorCodigo)
  .delete(verificaJWT, PublicacoesController.deletePublicacao);

rotas.route("/login").post(login);

rotas
  .route("/comentario")
  .post(verificaJWT, ComentarioController.addComentario)
  .put(verificaJWT, ComentarioController.updateComentario);

rotas
  .route("/comentario/publicacao/:codigo")
  .get(verificaJWT, ComentarioController.getComentarioPorPublicacao);

rotas
  .route("/Comentario/:codigo")
  .get(verificaJWT, ComentarioController.getComentarioPorCodigo)
  .delete(verificaJWT, ComentarioController.deleteComentario);

rotas.route("/usuario").post(UsuarioController.addUser);

module.exports = rotas;
