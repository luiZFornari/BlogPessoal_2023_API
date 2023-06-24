class Publicacao {
  constructor(codigo, titulo, descricao, data, imagem, link) {
    this.codigo = codigo;
    this.titulo = titulo;
    this.descricao = descricao;
    this.data = data;
    this.imagem = imagem;
    this.link = link;
  }
}

module.exports = Publicacao;
