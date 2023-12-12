import { Album } from '../../album/album.model';
import { Banda } from '../../banda/banda.model';

export class Musica {
	id?: number;
	nome: string;
	duracao: number;
	disponivel?: boolean = true;
	dataDeCriacao?: Date;
	album: Album;
	banda: Banda;
	imagem?: string;

	constructor(
		nome: string,
		duracao: number,
		album: Album,
		banda: Banda,
	) {
		this.nome = nome;
		this.duracao = duracao;
		this.album = album;
		this.banda = banda;
	}
}
