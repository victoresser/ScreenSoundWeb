import { Component, Input, OnInit } from '@angular/core';
import { Musica } from 'src/app/interfaces';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent implements OnInit {
  @Input() musicas: Array<Musica> = [];
  filtro: string = '';

  constructor(private musicaService: MusicaService) {}

  ngOnInit(): void {
    this.carregarMusica();
  }

  carregarMusica() {
    this.musicaService
      .listarMusicas(this.filtro)
      .subscribe((musica) => (this.musicas = musica));
  }
}
