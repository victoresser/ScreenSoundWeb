import {
	Component,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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

	rotaAtual: string = '';
	hasMoreData = true;
	search = false;
	delete = false;
	listar = true;
	edit = false;
	add = false;

	musicas: Musica[] = [];
	albuns: Album[] = [];
	bandas: Banda[] = [];

	constructor(
		private router: Router,
		private routeChangeService: RouteChangeService
	) {
		this.routerSubscription = this.routeChangeService
			.getRouteChangeObservable()
			.subscribe((route: string) => {
				this.rotaAtual = route;
			});

		this.add = false;
		this.edit = false;
		this.listar = true;
		this.delete = false;
		this.hasMoreData = true;
	}

	ngOnInit(): void {}

	log() {
		this.listar = !this.listar;
		this.add = !this.add;
		console.log(
			`Rota atual: ${this.rotaAtual} | Status Add: ${this.add} | Status Listar: ${this.listar}`
		);
	}

	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
	}
}
