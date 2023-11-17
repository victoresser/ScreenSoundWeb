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
  empty: string = "";
  @Input() musicas: Array<Musica> = [];
  albuns: Array<Album> = [];
  bandas: Array<Banda> = [];

  constructor(
    private musicaService: MusicaService,
    private albumService: AlbumService,
    private bandaService: BandaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarMusica();
  }

  carregarMusica() {
    const musicaId = 1; // Substitua pelo ID da sua música
    this.musicaService.listarTopFive().subscribe(
      (musica) => {
        this.musicas = musica;
      },
      error => {
        console.error('Erro ao carregar a música:', error);
      }
    );
  }
}
