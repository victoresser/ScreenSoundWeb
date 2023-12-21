import { Album } from "../../album/model/album.model";
import { Musica } from "../../musica/models/musica.model";

export class Banda {
	id?: number;
	nome: string = '';
	descricao: string = '';
	dataDeCriacao?: Date;
	albunsDaBanda: Album[] = [];
	musicasDaBanda: Musica[] = [];
	imagem?: string;
}
