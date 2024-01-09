export interface CreateMusicaDto {
	nomeMusica: string;
	duracao: number;
	disponivel: boolean;
	nomeBanda: string;
	nomeAlbum: string;
	imagem: string;
}

export interface EditMusicaDto {
	nome?: string;
	duracao?: number;
	descricao?: string;
	disponivel?: boolean;
	banda?: string;
	album?: string;
	imagem?: string;
}
