const { pool } = require("../config");
const User = require("../entities/usuario");

const addUserDB = async (body) => {
  try {
    const { usuario, email, senha } = body;
    const results = await pool.query(
      `INSERT INTO usuario (usuario, email,senha) 
        values ($1, $2,$3) returning codigo, usuario, email,senha`,
      [usuario, email, senha]
    );
    const user = results.rows[0];
    return new User(user.codigo, user.usuario, user.email, user.senha);
  } catch (err) {
    throw "Erro ao inserir o usuario: " + err;
  }
};

const getUserPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(
      `Select * from usuario where codigo = $1`,
      [codigo]
    );
    const user = results.rows[0];
    return new User(user.codigo, user.usuario, user.email, user.senha);
  } catch (err) {
    throw "Nenhum usuario encontrado: " + err;
  }
};

module.exports = { addUserDB, getUserPorCodigoDB };
