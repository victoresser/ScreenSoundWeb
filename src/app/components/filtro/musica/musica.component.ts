import { Component, Input } from '@angular/core';
import { Musica } from 'src/app/interfaces';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css'],
})
export class MusicaComponent {
  @Input() musicas: Array<Musica> = [];
  filtro: string = '';

  constructor(private musicaService: MusicaService) {}

  ngOnInit(): void {
    this.carregarMusica();
  }

  carregarMusica() {
    this.musicaService
      .listar(this.filtro)
      .subscribe((musica) => (this.musicas = musica));
  }
}
