import { EditMusicaDto } from './../musica/interfaces/musica.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HandleService } from 'src/app/services/common/handle.service';
import { Banda } from '../banda/models/banda.model';
import { Album } from '../album/model/album.model';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.css',
})
export class EditComponent {
	@Input() musica: EditMusicaDto = {
		nome: '',
		duracao: 0,
		album: '',
		banda: '',
		disponivel: false,
		imagem: '',
	};

	@Input() banda = new Banda();
	@Input() album = new Album();

	@Input() rotaAtual = '';
	@Input() edit = false;
	@Output() editChange = new EventEmitter<boolean>();

	handler = this.handle;

	constructor(private handle: HandleService) {}

	onEditChange() {
		this.edit = !this.edit;
		this.editChange.emit(this.edit);
	}

	protected onEditMusic(musica: EditMusicaDto): void {

	}
}
