/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { MusicaService } from 'src/app/services/musica/musica.service';
import { AlbumService } from 'src/app/services/album/album.service';
import { BandaService } from 'src/app/services/banda/banda.service';
import { ModalService } from 'src/app/services/common/modal.service';

@Component({
	selector: 'app-filtro',
	templateUrl: './filtro.component.html',
	styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent implements OnDestroy, OnInit {
	private routerSubscription: Subscription = new Subscription();
	private listSubscription: Subscription = new Subscription();
	@Output() rotaChange: EventEmitter<string> = new EventEmitter<string>();

	handler = this.handle;
	id?: number = 0;
	rotaAtual = '';
	search = false;
	delete = false;
	listar = true;
	edit = false;
	add = false;

	@Input() musicas: Musica[] = [];
	@Input() albuns: Album[] = [];
	@Input() bandas: Banda[] = [];

	constructor(
		private handle: HandleService,
		private dataService: DataService,
		private albumService: AlbumService,
		private bandaService: BandaService,
		private musicaService: MusicaService,
		private routeChangeService: RouteChangeService,
		private modalService: ModalService
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
				this.search = false;
				this.dataService.armazenaFiltro('');
			});
	}

	ngOnInit(): void {
		this.id = this.dataService.obterIdSelecionado();
	}

	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
		this.listSubscription.unsubscribe();
	}

	openAdd() {
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
		if (this.add) this.add = false;

		if (this.edit) this.edit = false;

		if (!this.listar) this.listar = !this.listar;

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

	async onDelete(rotaAtual: string) {
		this.id = this.dataService.obterIdSelecionado();
		return rotaAtual === '/filtro/musicas'
			? (await this.musicaService.onDelete(this.id!)).subscribe()
			: rotaAtual === '/filtro/albuns'
			? (await this.albumService.onDelete(this.id!)).subscribe()
			: (await this.bandaService.onDelete(this.id!)).subscribe();
	}
}
