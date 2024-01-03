import { CreateMusicaDto } from './../musica/interfaces/musica.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HandleService } from 'src/app/services/common/handle.service';
import { Musica } from '../musica/models/musica.model';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrl: './add.component.css',
})
export class AddComponent {
	handler = this.handle;

	public musica!: CreateMusicaDto;

	@Input() add = false;
	@Input() listar = true;
	@Input() rotaAtual?: string;
	@Output() addChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		private handle: HandleService,
		private musicaService: MusicaService,
		private toastr: ToastrService
	) {}

	onAddChange() {
		this.add = !this.add;
		this.addChange.emit(this.add);
	}

	onAddMusica(musica: CreateMusicaDto): void {
		if (!musica.nome.trim()) {
			this.toastr.warning('Nome da música não pode estar vazio.', 'Atenção!');
			return;
		}

		const newMusic: Musica = {
			nome: musica.nome,
			banda: musica.banda,
			album: musica.album,
			duracao: musica.duracao,
			disponivel: musica.disponivel,
		};

		this.musicaService.addMusic(newMusic);
		this.toastr.success('Música Adicionada!');
	}
}
