import { Album } from '../../album/album.model';
import { Banda } from '../../banda/banda.model';

export interface CreateMusicaDto {
	nome: string;
	duracao: number;
	disponivel: boolean;
	banda: Banda;
	album: Album;
}

export interface EditMusicaDto {
	nome: string;
	descricao: string;
}
