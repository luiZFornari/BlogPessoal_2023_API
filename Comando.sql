create Table Usuario (
    codigo serial primary key,
    usuario varchar(30) not null,
    senha varchar(30) not null,
    seguindo integer[] ,
    email varchar 255 not null,
    telefone varchar 20 ,
)



create Table Publicacao (
    codigo serial primary key,
    titulo varchar(30) not null,
    descricao varchar(500) not null,
    data varchar(15) not null ,
    usuario integer not null, 
)

create Table Comentario (
    codigo serial primary key,
    texto varchar(500) not null,
    data varchar(15) not null ,
    publicacao integer not null,
    usuario integer not null, 
    FOREIGN KEY (Publicacao) REFERENCES Comentario (publicacao);
)