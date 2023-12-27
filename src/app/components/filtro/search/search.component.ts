import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { RouteChangeService } from 'src/app/services/routes/route-change.service';
import { Banda } from '../banda/models/banda.model';
import { HandleService } from 'src/app/services/common/handle.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrl: './search.component.css',
})
export class SearchComponent {
	@Input() rotaAtual = '';
	@Input() bandas: Banda[] = [];
	@Input() search = false;
	@Input() filtro = '';
	@Output() searchChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	routerSubscription: Subscription;
	handler = this.handle;

	onSearchChange() {
		this.search = !this.search;
		this.searchChange.emit(this.search);
	}

	pesquisar(filtro: string) {
		return filtro;
	}

	constructor(
		private routeChangeService: RouteChangeService,
		private handle: HandleService
	) {
		this.routerSubscription = this.routeChangeService
			.getRouteChangeObservable()
			.pipe(filter((route: string) => route !== null))
			.subscribe((route: string) => {
				this.rotaAtual = route;
			});
	}
}
