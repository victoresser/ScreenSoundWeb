
export class Musica {
	id?: number;
	nome: string;
	duracao: number;
	disponivel: boolean = false;
	dataDeCriacao?: Date;
	album: string;
	banda: string;
	imagem?: string;

	constructor(
		nome: string,
		duracao: number,
		album: string,
		banda: string,
	) {
		this.nome = nome;
		this.duracao = duracao;
		this.album = album;
		this.banda = banda;
	}
}
