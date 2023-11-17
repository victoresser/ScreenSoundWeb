export interface Musica {
  id?: number;
  nome: string;
  duracao: number;
  dataDeCriacao: Date;
  album: string;
  banda: string;
  imagem: string;
}

export interface Album {
  id?: number;
  nome: string;
  dataDeCriacao: Date;
  banda: string;
  imagem: string;
  musicasDoAlbum: Array<Musica>;
}

export interface Banda {
  id?: number;
  nome: string;
  descricao: string;
  dataDeCriacao: Date;
  albunsDaBanda: Array<Album>;
  musicasDaBanda: Array<Musica>;
  imagem: string;
}
