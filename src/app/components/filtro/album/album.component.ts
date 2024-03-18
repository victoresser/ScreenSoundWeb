import { Component, Input, OnInit } from '@angular/core';
import { Album } from './model/album.model';
import { fadeIn, hoverAnimation } from 'src/app/animations';
import { DataService } from 'src/app/services/data/data.service';
import { HandleService } from 'src/app/services/common/handle.service';
import { AlbumService } from 'src/app/services/album/album.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-album',
	templateUrl: './album.component.html',
	styleUrls: ['./album.component.scss'],
	animations: [fadeIn, hoverAnimation],
})
export class AlbumComponent implements OnInit {
	albuns: Album[] = [];
	handler = this.handle;
	albumSubscription = new Subscription();
	filtroSubscription = new Subscription();

	@Input() filtro: string = '';
	@Input() listar = true;
	@Input() add = false;
	@Input() edit = false;
	@Input() delete = false;
	@Input() search = false;

	page = 1;
	pageSize = 20;
	hasMoreData = true;
	scrollDistance = 2;
	scrollUpDistance = 1.5;
	isHovered: number | null = null;

	constructor(
		private dataService: DataService,
		private handle: HandleService,
		private albumService: AlbumService
	) {
		this.albumSubscription = this.albumService
			.obterAtualizacao()
			.subscribe(async () => {
				await this.recarregarLista();
			});

		this.filtroSubscription = this.dataService
			.obterFiltroNotification()
			.subscribe(async () => {
				this.filtro = this.dataService.obterFiltro();
				await this.recarregarLista();
			});
	}

	async ngOnInit(): Promise<void> {
		await this.carregarAlbuns();
	}

	private async recarregarLista() {
		return (
			await this.albumService.getAlbuns(this.page, this.filtro)
		).subscribe((albuns) => {
			this.page = 1;
			this.albuns = [];
			this.albuns = albuns;
		});
	}

	async carregarAlbuns() {
		return (
			await this.albumService.getAlbuns(this.page, this.filtro)
		).subscribe((album) => {
			this.albuns = this.albuns.concat(album);

			if (album.length < this.pageSize) {
				this.hasMoreData = false;
			}
		});
	}

	idSelecionado(id?: number) {
		console.log('Este é o ID selecionado: ' + id);
		this.dataService.armazenaIdSelecionado(id);
	}

	onScroll(): void {
		this.page++;
		this.carregarAlbuns();
	}
}
