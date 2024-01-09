import { Album } from "../../album/model/album.model";
import { Banda } from "../../banda/models/banda.model";

export class Musica {
	id?: number;
	nome: string;
	duracao: number;
	disponivel: boolean = false;
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
