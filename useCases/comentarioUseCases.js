const { pool } = require("../config");
const Comentario = require("../entities/comentario");

const getComentarioDB = async (codigo) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM comentario 
      WHERE publicacao = $1`,
      [codigo]
    );
    return rows.map(
      (comentario) =>
        new Comentario(
          comentario.codigo,
          comentario.texto,
          comentario.data,
          comentario.usuario,
          comentario.publicacao
        )
    );
  } catch (err) {
    throw "Erro: " + err;
  }
};

const addComentarioDB = async (body) => {
  try {
    const { texto, data, usuario, publicacao } = body;
    const results = await pool.query(
      `INSERT INTO comentario ( texto, data, usuario,  publicacao)
             values ($1, $2,$3,$4) returning codigo,texto, data, usuario,  publicacao`,
      [texto, data, usuario, publicacao]
    );
    const comentario = results.rows[0];
    (comentario) =>
      new Comentario(
        comentario.codigo,
        comentario.texto,
        comentario.data,
        comentario.usuario,
        comentario.publicacao
      );
    return comentario;
  } catch (err) {
    throw "Erro ao inserir a comentario: " + err;
  }
};

const updateComentarioDB = async (body) => {
  try {
    const { codigo, texto, data, usuario, publicacao } = body;
    const results = await pool.query(
      `UPDATE comentario SET texto=$1, data=$2, usuario=$3, publicacao = $4
             where codigo=$5 returning codigo,texto, data, usuario,publicacao`,
      [texto, data, usuario, publicacao, codigo]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
    }
    const comentario = results.rows[0];
    (comentario) =>
      new Comentario(
        comentario.codigo,
        comentario.texto,
        comentario.data,
        comentario.usuario,
        comentario.publicacao
      );

    return comentario;
  } catch (err) {
    throw "Erro ao alterar comentario: " + err;
  }
};

const deleteComentarioDB = async (codigo) => {
  try {
    const results = await pool.query(
      `DELETE FROM comentario 
        WHERE codigo = $1`,
      [codigo]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para
            ser removido`;
    } else {
      return `comentario de código ${codigo} removida com sucesso!`;
    }
  } catch (err) {
    throw "Erro ao remover a comentario: " + err;
  }
};

const getComentarioPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(
      `SELECT * FROM comentario 
        WHERE codigo = $1`,
      [codigo]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo}`;
    } else {
      const comentario = results.rows[0];
      (comentario) =>
        new Comentario(
          comentario.codigo,
          comentario.texto,
          comentario.data,
          comentario.usuario,
          comentario.publicacao
        );
      return comentario;
    }
  } catch (err) {
    throw "Erro ao recuperar a comentario: " + err;
  }
};

module.exports = {
  getComentarioDB,
  addComentarioDB,
  updateComentarioDB,
  deleteComentarioDB,
  getComentarioPorCodigoDB,
};
