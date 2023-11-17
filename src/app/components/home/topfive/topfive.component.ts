import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Album, Banda, Musica } from 'src/app/interfaces';
import { AlbumService } from 'src/app/services/album/album.service';
import { BandaService } from 'src/app/services/banda/banda.service';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-topfive',
  templateUrl: './topfive.component.html',
  styleUrls: ['./topfive.component.css'],
})
export class TopfiveComponent implements OnInit {
  @Input() musicas: Array<Musica> = [];
  @Input() albuns: Array<Album> = [];
  @Input() bandas: Array<Banda> = [];

  constructor(
    private musicaService: MusicaService,
    private albumService: AlbumService,
    private bandaService: BandaService,
    private router: Router
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
