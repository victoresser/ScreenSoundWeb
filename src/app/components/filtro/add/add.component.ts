import { CreateMusicaDto } from './../musica/interfaces/musica.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HandleService } from 'src/app/services/common/handle.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { ToastrService } from 'ngx-toastr';
import { BandaService } from 'src/app/services/banda/banda.service';
import { AlbumService } from 'src/app/services/album/album.service';
import { CreateAlbumDto } from '../album/interfaces/album.interface';

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
		imagem: ''
	}

	@Input() add = false;
	@Input() listar = true;
	@Input() rotaAtual?: string;
	@Output() addChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		private handle: HandleService,
		private musicaService: MusicaService,
		private bandaService: BandaService,
		private albumService: AlbumService,
		private toastr: ToastrService
	) {}

	onAddChange() {
		this.add = !this.add;
		this.addChange.emit(this.add);
	}

	onAddMusica(musica: CreateMusicaDto): void {
		if (!this.musicaService.validateMusica(musica)) {
			this.onAddChange();
			return;
		}

		this.musicaService.addMusic(musica).subscribe(
			(success) => {
				success.nome = musica.nomeMusica;
				this.toastr.success(
					`Música ${success.nome} adicionada com sucesso!`,
					'Sucesso!'
				);
			},
			(error) =>
				this.toastr.error(
					`Algo aconteceu durante o processo de adição da música e foi impossível prosseguir[${error}]`,
					'Erro!'
				),
			() => this.toastr.info('Requisição finalizada.', 'Info')
		);

		this.onAddChange();
	}

	onAddAlbum(album: CreateAlbumDto) {
		// const musicasSelecionadas = this.musicSelect.selected as any[];

		this.albumService.AddAlbum(album).subscribe(
			(success) => {
				success.nome = album.nome;
				this.toastr.success('Album adicionado com sucesso!', success.nome)
			},
			(error) => {
				error = "Erro!";
				this.toastr.error('Não foi possível concluir a adição deste Álbum', error)
			}
		);
	}
}
