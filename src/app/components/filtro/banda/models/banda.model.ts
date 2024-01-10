import { Album } from '../../album/model/album.model';
import { Musica } from '../../musica/models/musica.model';

export class Banda {
	id?: number;
	nome: string = '';
	descricao: string = '';
	dataDeCriacao?: Date;
	albunsDaBanda: Album[] = [];
	musicasDaBanda: Musica[] = [];
	imagem?: string;

	constructor(nome?: string, descricao?: string, dataDeCriacao?: Date) {
		if (nome != null) this.setNome(nome);
		if (descricao != null) this.setDescricao(descricao);
		if (dataDeCriacao != null) this.setDataDeCriacao(dataDeCriacao);
	}

	public setNome(novoNome: string): void {
		this.nome = novoNome;
	}

	public setDescricao(novaDescricao: string): void {
		this.descricao = novaDescricao;
	}

	public setDataDeCriacao(novaData: Date): void {
		this.dataDeCriacao = new Date(novaData.getDate());
	}
	public addAlbum(novoAlbum: Album): void {
		this.albunsDaBanda.push(novoAlbum);
	}

	public removeAlbum(index: number): void {
		this.albunsDaBanda.splice(index, 1);
	}

	public setImagem(urlImagem: string): void {
		this.imagem = urlImagem;
	}
}
