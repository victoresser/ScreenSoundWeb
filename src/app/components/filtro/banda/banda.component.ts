import { Component, Input, OnInit } from '@angular/core';
import { fadeIn, hoverAnimation } from 'src/app/animations';
import { Banda } from 'src/app/interfaces';
import { BandaService } from 'src/app/services/banda/banda.service';

@Component({
  selector: 'app-banda',
  templateUrl: './banda.component.html',
  styleUrls: ['./banda.component.css'],
  animations: [fadeIn, hoverAnimation]
})
export class BandaComponent implements OnInit {
  @Input() bandas: Banda[] = [];
  filtro: string = '';
  isHovered: number | null = null;

  constructor(private bandaService: BandaService) {}
  ngOnInit(): void {
    this.carregarBandas();
  }

  carregarBandas() {
    this.bandaService
      .listar(this.filtro)
      .subscribe((banda) => (this.bandas = banda));
  }

  onMouseOver(index: number) {
    this.isHovered = index;
  }

  onMouseOut() {
    this.isHovered = null;
  }
}
