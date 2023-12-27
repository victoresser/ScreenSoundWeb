import { Album } from '../../album/model/album.model';
import { Banda } from '../../banda/models/banda.model';

export interface CreateMusicaDto {
	nome: string;
	duracao: number;
	disponivel: boolean;
	banda: Banda;
	album: Album;
	imagem: string;
}

export interface EditMusicaDto {
	nome?: string;
	duracao?: number;
	descricao?: string;
	disponivel?: boolean;
	banda?: Banda;
	album?: Album;
	imagem?: string;
}
