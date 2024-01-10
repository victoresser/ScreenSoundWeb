export interface CreateMusicaDto {
	nomeMusica: string;
	duracao: number;
	disponivel: boolean;
	nomeBanda: string;
	nomeAlbum: string;
	imagem: string;
}

export interface EditMusicaDto {
	id: number;
	nomeMusica?: string;
	duracao?: number;
	descricao?: string;
	disponivel?: boolean;
	nomeBanda?: string;
	nomeAlbum?: string;
	imagem?: string;
}
