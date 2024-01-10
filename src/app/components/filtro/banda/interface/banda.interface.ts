export interface CreateBandaDto {
	nome: string;
	descricao: string;
	imagem?: string;
}

export interface EditBandaDto {
	id: number
	nome?: string;
	descricao?: string;
	imagem?: string;
}
