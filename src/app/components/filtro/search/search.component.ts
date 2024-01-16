/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlbumService } from 'src/app/services/album/album.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { RouteChangeService } from 'src/app/services/routes/route-change.service';
import { HandleService } from 'src/app/services/common/handle.service';
import { DataService } from 'src/app/services/data/data.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { BandaService } from 'src/app/services/banda/banda.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
	@Input() rotaAtual = '';
	@Input() search = false;

	@Output() searchChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	routerSubscription: Subscription;
	handler = this.handle;
	nomeBanda = '';
	nomeAlbum = '';
	filtro = '';

	constructor(
		private routeChangeService: RouteChangeService,
		private dataService: DataService,
		private musicaService: MusicaService,
		private bandaService: BandaService,
		private albumService: AlbumService,
		private handle: HandleService
	) {
		this.routerSubscription = this.routeChangeService
			.getRouteChangeObservable()
			.pipe(filter((route: string) => route !== null))
			.subscribe((route: string) => {
				this.rotaAtual = route;
				this.filtro = '';
			});
	}

	ngOnInit(): void {
		return;
	}

	onSearchChange() {
		this.search = !this.search;
		this.dataService.armazenaFiltro('');
		this.searchChange.emit(this.search);
	}

	async onSearch(filtro: string, entityService: any) {
		this.dataService.armazenaFiltro(filtro);
		entityService.notificarFiltro();
	}

	onSearchMusicas() {
		return this.onSearch(this.filtro, this.musicaService);
	}

	onSearchAlbum() {
		return this.onSearch(this.filtro, this.albumService)
	}

	onSearchBanda() {
		return this.onSearch(this.filtro, this.bandaService);
	}
}
