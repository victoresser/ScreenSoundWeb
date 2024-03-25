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
	imagem?: File;
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

	onImageChange(event: any) {
		const file: File = event.target.files[0];

		if (file) {
			this.imagem = file;
			const reader = new FileReader();

			reader.onload = (e: any) => {
				this.imagem = e.target.result;
			};

			reader.readAsDataURL(file);
		}
	}

	private async onFileSelected(dto: any, entity: string) {
		if (dto) {
			const url = this.formataNomeCamelCase(dto.nome, entity);
			dto.imagem = url;

			console.log(`Camingo da imagem: ${dto.imagem}`);
			// this.toastr.info(`Url de imagem alterada para ${url}`, 'Caminho da imagem alterado!');
		}

		return;
	}

	private formataNomeCamelCase(nome: string, entity: string) {
		const format = nome;
		const nomeFormatado = format.replace(/\s+(\w)/g, (_, p1) => p1.toUpperCase());
		const url = `../../../../assets/${entity}/${nomeFormatado.charAt(0).toLocaleLowerCase()}.png`;
		return url;
	}

	protected async onAdd(entity: object, entityService: any) {
		(await entityService.onAdd(entity)).subscribe(() => {
			this.onAddChange();
		});
	}

	async onAddMusica(musica: CreateMusicaDto) {
		if (!this.musicaService.validarMusica(musica)) return this.onAddChange();
		await this.onFileSelected(musica, 'musicas');
		return await this.onAdd(musica, this.musicaService);
	}

	async onAddAlbum(album: CreateAlbumDto) {
		await this.onFileSelected(album, 'albuns');
		return await this.onAdd(album, this.albumService);
	}

	async onAddBanda(banda: CreateBandaDto) {
		await this.onFileSelected(banda, 'bandas');
		return await this.onAdd(banda, this.bandaService);
	}
}
