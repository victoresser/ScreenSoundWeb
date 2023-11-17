import { Component, OnInit } from '@angular/core';
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
  musicas: Array<Musica> = [];
  albuns: Array<Album> = [];
  bandas: Array<Banda> = [];

  constructor(
    private musicaService: MusicaService,
    private albumService: AlbumService,
    private bandaService: BandaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.musicaService.listarTopFive().subscribe((x) => {
      this.musicas = x;
    });
  }
}
