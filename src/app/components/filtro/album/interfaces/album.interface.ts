export interface CreateAlbumDto {
	nome: string;
	nomeBanda: string;
	imagem?: string;
}

export interface EditAlbumDto {
	id: number;
	nome?: string;
	nomeBanda?: string;
	imagem?: string;
}
