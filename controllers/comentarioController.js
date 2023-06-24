const {
  addComentarioDB,
  updateComentarioDB,
  deleteComentarioDB,
  getComentarioDB,
  getComentarioPorCodigoDB,
} = require("../useCases/comentarioUseCases");

const getComentarioPorPublicacao = async (request, response) => {
  await getComentarioDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: "Erro ao consultar o comentario: " + err,
      })
    );
};

const addComentario = async (request, response) => {
  await addComentarioDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Publicação criada",
        objeto: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const updateComentario = async (request, response) => {
  await updateComentarioDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Comentario alterado alterado",
        objeto: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const deleteComentario = async (request, response) => {
  await deleteComentarioDB(parseInt(request.params.codigo))
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const getComentarioPorCodigo = async (request, response) => {
  await getComentarioPorCodigoDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

module.exports = {
  getComentarioPorPublicacao,
  addComentario,
  updateComentario,
  deleteComentario,
  getComentarioPorCodigo,
};
