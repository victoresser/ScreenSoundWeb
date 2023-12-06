import { Album } from "../../album/album.model";
import { Banda } from "../../banda/banda.model";

export class Musica {
	id?: number;
	nome: string = '';
	duracao: number = 0;
	disponivel: boolean = true;
	dataDeCriacao?: Date;
	album: Album = new Album;
	banda: Banda = new Banda;
	imagem?: string = '';
}
