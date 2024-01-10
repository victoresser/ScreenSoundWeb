import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { Musica } from './musica/models/musica.model';
import { Album } from './album/model/album.model';
import { Banda } from './banda/models/banda.model';
import { RouteChangeService } from 'src/app/services/routes/route-change.service';
import { HandleService } from 'src/app/services/common/handle.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
	selector: 'app-filtro',
	templateUrl: './filtro.component.html',
	styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent implements OnDestroy, OnInit {
	private routerSubscription: Subscription = new Subscription();

	rotaAtual = '';
	@Output() rotaChange: EventEmitter<string> = new EventEmitter<string>();
	search = false;
	delete = false;
	listar = true;
	edit = false;
	add = false;
	handler = this.handle;
	id?: number = 0;

	@Input() musicas: Musica[] = [];
	@Input() albuns: Album[] = [];
	@Input() bandas: Banda[] = [];

	constructor(
		private routeChangeService: RouteChangeService,
		private handle: HandleService,
		private dataService: DataService
	) {
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
	}

	ngOnInit() {
		this.id = this.dataService.obterIdSelecionado();
	}

	openAdd() {
		if (this.listar) this.listar = !this.listar;

		if (!this.listar) this.listar = !this.listar;

		if (this.search) this.search = !this.search;

		if (this.edit) this.edit = !this.edit;

		this.dataService.armazenaIdSelecionado(0);
		this.add = !this.add;
	}

	onAddChange(add: boolean) {
		this.add = add;
	}

	openSearch() {
		if (this.add) this.add = false;

		if (this.edit) this.edit = false;

		this.dataService.armazenaIdSelecionado(0);
		this.search = !this.search;
	}

	onSearchChange(search: boolean): void {
		this.search = search;
	}

	openEdit() {
		if (!this.dataService.validaRota(this.rotaAtual)) {
			return;
		}

		if (this.search) this.search = false;

		if (this.add) this.add = false;

		this.edit = !this.edit;

		if (this.edit == false) {
			this.dataService.armazenaIdSelecionado(0);
		}
	}

	onEditChange(edit: boolean) {
		this.edit = edit;
	}

	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
	}
}
