const { pool } = require("../config");
const Publicacao = require("../entities/publicacao");

const getPublicacoesDB = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM publicacao ORDER BY codigo"
    );
    return rows.map(
      (publicacao) =>
        new Publicacao(
          publicacao.codigo,
          publicacao.titulo,
          publicacao.descricao,
          publicacao.data,
          publicacao.imagem,
          publicacao.link,
          publicacao.usuario,
          publicacao.curtidas
        )
    );
  } catch (err) {
    throw "Erro : " + err;
  }
};

const addPublicacaoDB = async (body) => {
  try {
    const { titulo, descricao, data, imagem, link } = body;
    const results = await pool.query(
      `INSERT INTO publicacao (titulo, descricao,data,imagem,link) 
        values ($1, $2,$3,$4,$5) returning codigo, titulo, descricao,data,imagem,link`,
      [titulo, descricao, data, imagem, link]
    );
    const publicacao = results.rows[0];
    return new Publicacao(
      publicacao.codigo,
      publicacao.titulo,
      publicacao.descricao,
      publicacao.data,
      publicacao.imagem,
      publicacao.link
    );
  } catch (err) {
    throw "Erro ao inserir a publicação: " + err;
  }
};

const updatePublicacaoDB = async (body) => {
  try {
    const { codigo, titulo, descricao, data, imagem, link } = body;
    const results = await pool.query(
      `UPDATE publicacao SET titulo=$1, descricao=$2, data=$3,imagem=$4,link=$5 
        where codigo=$6 returning codigo, titulo, descricao, data,imagem `,
      [titulo, descricao, data, imagem, link, codigo]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
    }
    const publicacao = results.rows[0];
    return new Publicacao(
      publicacao.codigo,
      publicacao.titulo,
      publicacao.descricao,
      publicacao.data,
      publicacao.imagem,
      publicacao.link
    );
  } catch (err) {
    throw "Erro ao alterar o Publicação: " + err;
  }
};

const deletePublicacaoDB = async (codigo) => {
  try {
    const resultsC = await pool.query(
      `DELETE FROM comentario WHERE publicacao = $1`,
      [codigo]
    );
    const results = await pool.query(
      `DELETE FROM publicacao WHERE codigo = $1`,
      [codigo]
    );
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
    } else {
      return "Publicação removido com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover o publicação: " + err;
  }
};

const getPublicacaoPorCodigoDB = async (codigo) => {
  try {
    const results = await pool.query(
      `SELECT * FROM publicacao WHERE codigo = $1`,
      [codigo]
    );
    if (results.rowCount == 0) {
      throw "Nenhum registro encontrado com o código: " + codigo;
    } else {
      const publicacao = results.rows[0];
      return new Publicacao(
        publicacao.codigo,
        publicacao.titulo,
        publicacao.descricao,
        publicacao.data,
        publicacao.imagem,
        publicacao.link
      );
    }
  } catch (err) {
    throw "Erro ao recuperar o publicaçao: " + err;
  }
};

module.exports = {
  getPublicacoesDB,
  addPublicacaoDB,
  deletePublicacaoDB,
  getPublicacaoPorCodigoDB,
  updatePublicacaoDB,
};
