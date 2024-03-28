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
	styleUrl: './add.component.scss',
})
export class AddComponent {
	handler = this.handle;
	imagem?: string;
	nenhumaImagem = '../../../../assets/musicas/nenhuma-imagem.png';

	public musica: CreateMusicaDto = {
		nome: '',
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
		imagem: ''
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

	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		const reader = new FileReader();

		if (file) {
			reader.readAsDataURL(file);

			reader.onloadend = () => {
				this.imagem = reader.result as string;
				console.log(this.imagem);
			};
		}
	}

	private async onAdd(entity: object, entityService: any) {
		(await entityService.onAdd(entity)).subscribe();
		this.onAddChange();
	}

	async onAddMusica(musica: CreateMusicaDto) {
		if (!this.musicaService.validarMusica(musica)) return this.onAddChange();

		if (this.imagem) {
			musica.imagem = this.imagem;
		}

		return await this.onAdd(musica, this.musicaService);
	}

	async onAddAlbum(album: CreateAlbumDto) {
		if (this.imagem) {
			album.imagem = this.imagem;
		}

		return await this.onAdd(album, this.albumService);
	}

	async onAddBanda(banda: CreateBandaDto) {
		if (this.imagem) {
			banda.imagem = this.imagem;
			console.log(banda.imagem)
		}

		return await this.onAdd(banda, this.bandaService);
	}

	isValidBase64(str: string): boolean {
		try {
				return btoa(atob(str)) == str;
		} catch (err) {
				return false;
		}
}
}
