import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Musica } from './musica/models/musica.model';
import { Album } from './album/model/album.model';
import { Banda } from './banda/models/banda.model';

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

	constructor(private router: Router, private route: ActivatedRoute) {
		this.rotaAtual = this.route.snapshot.url.join('');

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.rotaAtual = event.urlAfterRedirects;
			}
		});
	}

	ngOnInit(): void {
		this.rotaAtual = this.route.snapshot.url.join('');

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.rotaAtual = event.urlAfterRedirects;
			}
		});
	}

	log() {
		this.add = !this.add;
		this.listar = !this.listar;
		console.log(`Rota atual: ${this.rotaAtual} | Status: ${this.add}`);
	}

	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
	}
}
