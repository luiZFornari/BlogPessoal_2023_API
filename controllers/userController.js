const { addUserDB } = require("../useCases/userUseCases");

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

module.exports = { addUser };
