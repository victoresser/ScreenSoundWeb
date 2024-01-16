/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditBandaDto } from './../banda/interface/banda.interface';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { EditMusicaDto } from './../musica/interfaces/musica.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HandleService } from 'src/app/services/common/handle.service';
import { EditAlbumDto } from '../album/interfaces/album.interface';
import { DataService } from 'src/app/services/data/data.service';
import { AlbumService } from 'src/app/services/album/album.service';
import { BandaService } from 'src/app/services/banda/banda.service';
import { Banda } from '../banda/models/banda.model';
import { Album } from '../album/model/album.model';
import { Musica } from '../musica/models/musica.model';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
	musica!: Musica;
	banda!: Banda;
	album!: Album;

	musicaDto: EditMusicaDto = {
		id: 0,
		imagem: '',
		duracao: 0,
		nomeAlbum: '',
		nomeBanda: '',
		nomeMusica: '',
		disponivel: true,
	};

	bandaDto: EditBandaDto = {
		id: 0,
		nome: '',
		imagem: '',
		descricao: '',
	};

	albumDto: EditAlbumDto = {
		id: 0,
		nome: '',
		imagem: '',
		nomeBanda: '',
	};

	@Input() id?: number = 0;
	@Input() rotaAtual = '';
	@Input() edit = false;
	@Output() editChange = new EventEmitter<boolean>();

	handler = this.handle;

	constructor(
		private handle: HandleService,
		private musicaService: MusicaService,
		private albumService: AlbumService,
		private bandaService: BandaService,
		private dataService: DataService
	) {}

	ngOnInit(): void {
		this.id = this.dataService.obterIdSelecionado();
	}

	onEditChange() {
		this.edit = !this.edit;
		this.dataService.armazenaIdSelecionado(0);
		this.editChange.emit(this.edit);
	}

	protected async onEdit(entity: any, entityService: any) {
		entity.id = this.dataService.obterIdSelecionado()!;
		(await entityService.onEdit(entity)).subscribe(() => {
			this.onEditChange();
		});
	}

	protected async onEditMusica(musica: EditMusicaDto) {

		(await this.musicaService.getForId(this.id!)).subscribe((res) => {
			this.musica = res;
		});
		this.onEdit(musica, this.musicaService);
	}

	protected onEditAlbum(album: EditAlbumDto) {
		this.onEdit(album, this.albumService);
	}

	protected onEditBanda(banda: EditBandaDto) {
		this.onEdit(banda, this.bandaService);
	}
}
