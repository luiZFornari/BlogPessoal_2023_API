const {
  addPublicacaoDB,
  updatePublicacaoDB,
  deletePublicacaoDB,
  getPublicacaoPorCodigoDB,
  getPublicacoesDB,
} = require("../useCases/publicacaoUseCases");

const getPublicacoes = async (request, response) => {
  await getPublicacoesDB()
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: "Erro ao consultar a publicação: " + err,
      })
    );
};

const addPublicacao = async (request, response) => {
  await addPublicacaoDB(request.body)
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

const updatePublicacao = async (request, response) => {
  await updatePublicacaoDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Publicação alterada ",
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

const deletePublicacao = async (request, response) => {
  await deletePublicacaoDB(parseInt(request.params.codigo))
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

const getPublicacaoPorCodigo = async (request, response) => {
  await getPublicacaoPorCodigoDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

module.exports = {
  getPublicacoes,
  addPublicacao,
  updatePublicacao,
  deletePublicacao,
  getPublicacaoPorCodigo,
  getPublicacoesDB,
};
