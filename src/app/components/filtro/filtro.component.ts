import {
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { Musica } from './musica/models/musica.model';
import { Album } from './album/model/album.model';
import { Banda } from './banda/models/banda.model';
import { RouteChangeService } from 'src/app/services/routes/route-change.service';

@Component({
	selector: 'app-filtro',
	templateUrl: './filtro.component.html',
	styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent implements OnInit, OnDestroy {
	private routerSubscription: Subscription = new Subscription();

	rotaAtual = '';
	@Output() rotaChange: EventEmitter<string> = new EventEmitter<string>();
	search = false;
	delete = false;
	listar = true;
	edit = false;
	add = false;

	musicas: Musica[] = [];
	albuns: Album[] = [];
	bandas: Banda[] = [];

	constructor(private routeChangeService: RouteChangeService) {
		this.routerSubscription = this.routeChangeService
			.getRouteChangeObservable()
			.pipe(filter((route: string) => route !== null))
			.subscribe((route: string) => {
				this.rotaAtual = route;
				this.add = false;
				this.edit = false;
				this.listar = true;
				this.delete = false;
			});

		this.add = false;
		this.edit = false;
		this.listar = true;
		this.delete = false;
	}

	ngOnInit(): void {}

	adicionar() {
		if (this.listar) this.listar = !this.listar;

		if (!this.listar) this.listar = !this.listar;

		if (this.search) this.search = !this.search;

		if (this.edit) this.edit = !this.edit;

		this.add = !this.add;
	}

	onAddChange(add: boolean) {
		this.add = add;
	}

	openSearch() {
		this.search = !this.search;

		if (this.add) {
			this.add = false;
		}
	}

	onSearchChange(search: boolean): void {
		this.search = search;
	}

	openEdit() {
		this.edit = !this.edit;
	}

	onEditChange(edit: boolean) {
		this.edit = edit;
	}

	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
	}
}
