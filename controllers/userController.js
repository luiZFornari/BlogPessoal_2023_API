const { addUserDB, getUserPorCodigoDB } = require("../useCases/userUseCases");

const addUser = async (request, response) => {
  try {
    const data = await addUserDB(request.body);
    response.status(200).json({
      status: "success",
      message: "Usuário Salvo",
      objeto: data,
    });
  } catch (err) {
    response.status(400).json({
      status: "error",
      message: "Erro adduser" + err,
    });
  }
};

const getUser = async (request, response) => {
  await getUserPorCodigoDB(parseInt(request.params.codigo))
    .then((data) => response.status(200).json(data))
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

module.exports = { addUser, getUser };
