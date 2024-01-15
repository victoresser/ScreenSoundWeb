/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateMusicaDto } from './../musica/interfaces/musica.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HandleService } from 'src/app/services/common/handle.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { BandaService } from 'src/app/services/banda/banda.service';
import { AlbumService } from 'src/app/services/album/album.service';
import { CreateAlbumDto } from '../album/interfaces/album.interface';
import { CreateBandaDto } from '../banda/interface/banda.interface';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrl: './add.component.css',
})
export class AddComponent {
	handler = this.handle;

	public musica: CreateMusicaDto = {
		nomeMusica: '',
		duracao: 0,
		nomeBanda: '',
		nomeAlbum: '',
		disponivel: false,
		imagem: '',
	};

	public album: CreateAlbumDto = {
		nome: '',
		nomeBanda: '',
		imagem: '',
	};

	public banda: CreateBandaDto = {
		nome: '',
		descricao: '',
	};

	@Input() add = false;
	@Input() listar = true;
	@Input() rotaAtual?: string;
	@Output() addChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		private handle: HandleService,
		private musicaService: MusicaService,
		private bandaService: BandaService,
		private albumService: AlbumService
	) {}

	onAddChange() {
		this.add = !this.add;
		this.addChange.emit(this.add);
	}

	protected async onAdd(entity: object, entityService: any) {
		(await entityService.onAdd(entity)).subscribe(() => {
			this.onAddChange();
		});
	}

	async onAddMusica(musica: CreateMusicaDto) {
		if (!this.musicaService.validateMusica(musica))
			return this.onAddChange();
		await this.onAdd(musica, this.musicaService);
	}

	async onAddAlbum(album: CreateAlbumDto) {
		await this.onAdd(album, this.albumService);
	}

	async onAddBanda(banda: CreateBandaDto) {
		await this.onAdd(banda, this.bandaService);
	}
}
