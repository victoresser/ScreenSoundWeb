import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album/album.service';
import { BandaService } from 'src/app/services/banda/banda.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { Album } from '../../filtro/album/model/album.model';
import { Banda } from '../../filtro/banda/models/banda.model';
import { Musica } from '../../filtro/musica/models/musica.model';

@Component({
	selector: 'app-topfive',
	templateUrl: './topfive.component.html',
	styleUrls: ['./topfive.component.css'],
})
export class TopfiveComponent implements OnInit {
	musicas: Array<Musica> = [];
	albuns: Array<Album> = [];
	bandas: Array<Banda> = [];

	constructor(
		private musicaService: MusicaService,
		private albumService: AlbumService,
		private bandaService: BandaService
	) {}

	ngOnInit(): void {
		this.carregarMusica();
		this.carregarBanda();
		this.carregarAlbuns();
	}

	carregarMusica() {
		this.musicaService
			.listarTopFive()
			.subscribe((musica) => (this.musicas = musica));
	}

	carregarBanda() {
		this.bandaService
			.listarTopFive()
			.subscribe((banda) => (this.bandas = banda));
	}

	carregarAlbuns() {
		this.albumService
			.listarTopFive()
			.subscribe((album) => (this.albuns = album));
	}
}
