
export interface MusicasTopFive {
	id?: number;
	nome: string;
	duracao: number;
	disponivel: boolean;
	dataDeCriacao: Date;
	imagem: string;
}

export interface AlbunsTopFive {
	id?: number;
	nome: string;
	banda: string;
	imagem: string;
}

export interface BandasTopFive {
	id?: number;
	nome: string;
	descricao: string;
	dataDeCriacao: Date;
	imagem: string;
}
