import { Banda } from "../banda/banda.model";
import { Musica } from "../musica/models/musica.model";

export class Album {
	id?: number;
	nome: string = '';
	dataDeCriacao?: Date;
	banda: Banda = new Banda;
	imagem?: string = '';
	musicasDoAlbum: Musica[] = [];
}
