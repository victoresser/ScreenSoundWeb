import { Component, Input } from '@angular/core';
import { Musica } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css'],
})
export class MusicaComponent {
  @Input() musicas: Array<Musica> = [];
  filtro: string = '';
  isHovered: number | null = null;
  page = 1;
  scrollDistance = 1000;
  scrollUpDistance = 0;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.carregarMusica();
  }

  carregarMusica() {
    this.service
      .getMusicas(1)
      .subscribe((musica) => (this.musicas = this.musicas.concat(musica)));
  }

  onMouseOver(index: number) {
    this.isHovered = index;
  }

  onMouseOut() {
    this.isHovered = null;
  }

  onScroll(): void {
    this.page++;
    this.carregarMusica();
  }
}
