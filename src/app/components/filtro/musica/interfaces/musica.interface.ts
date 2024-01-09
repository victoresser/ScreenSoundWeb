export interface CreateMusicaDto {
	nome: string;
	duracao: number;
	disponivel: boolean;
	banda: string;
	album: string;
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
