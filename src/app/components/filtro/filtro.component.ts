import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Musica } from './musica/models/musica.model';
import { Album } from './album/model/album.model';
import { Banda } from './banda/models/banda.model';
import { CreateMusicaDto } from './musica/interfaces/musica.interface';

@Component({
	selector: 'app-filtro',
	templateUrl: './filtro.component.html',
	styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent implements OnInit, OnChanges, OnDestroy {
	rotaAtual: string = '';
	private routerSubscription: Subscription = new Subscription();
	listar = true;
	add = false;
	edit = false;
	delete = false;
	search = false;
	filtro = '';

	@Input() objects = [
		{ titulo: 'Músicas', dados: [] as Array<Musica> },
		{ titulo: 'Albuns', dados: [] as Array<Album> },
		{ titulo: 'Bandas', dados: [] as Array<Banda> },
	]

	@Input() musicas: Musica[] = [];
	@Input() albuns: Album[] = [];
	@Input() bandas: Banda[] = [];

	addMusica: CreateMusicaDto = {
		nome: '',
		duracao: 1,
		disponivel: true,
		album: new Album(),
		banda: new Banda(),
		imagem: '',
	}


	constructor(private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.rotaAtual = this.route.snapshot.url.join('');

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.rotaAtual = event.urlAfterRedirects;
			}
		});
	}

	log() {
		this.add = !this.add
		console.log(`Rota atual: ${this.rotaAtual} | Status: ${this.add}`);
	}

	ngOnChanges(): void {}

	ngOnDestroy() {
		this.routerSubscription.unsubscribe();
	 }

	performMusicAction() {
		if (this.add) {
			console.log('Ação de adição música executada.');
		}

		if (this.edit) {
			console.log('Ação de edição música executada.');
		}

		if (this.delete) {
			console.log('Ação de exclusão música executada.');
		}
	}

	performAlbumAction(): void {}

	performArtistAction(): void {}

	pesquisar(filtro: string): void {}

	openForm(url: string) {
		if (url.startsWith('/musicas')) {
			this.performMusicAction();
		} else if (url.startsWith('/albuns')) {
			this.performAlbumAction();
		} else if (url.startsWith('/bandas')) {
			this.performArtistAction();
		}
	}
}
