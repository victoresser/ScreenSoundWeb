/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { RouteChangeService } from 'src/app/services/routes/route-change.service';
import { HandleService } from 'src/app/services/common/handle.service';
import { DataService } from 'src/app/services/data/data.service';

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
		this.searchChange.emit(this.search);
	}

	async onSearch(filtro: string) {
		this.dataService.armazenaFiltro(filtro);
		this.dataService.notificarFiltro();
	}

	onSearchMusicas() {
		return this.onSearch(this.filtro);
	}

	onSearchAlbum() {
		return this.onSearch(this.filtro);
	}

	onSearchBanda() {
		return this.onSearch(this.filtro);
	}
}
