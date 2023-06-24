class Comentario {
  constructor(codigo, texto, data, usuario, publicacao) {
    this.codigo = codigo;
    this.texto = texto;
    this.data = data;
    this.usuario = usuario;
    this.publicacao = publicacao;
  }
}

module.exports = Comentario;
