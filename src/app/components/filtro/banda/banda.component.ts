import { Component, Input, OnInit } from '@angular/core';
import { fadeIn, hoverAnimation } from 'src/app/animations';
import { DataService } from 'src/app/services/data/data.service';
import { Banda } from './models/banda.model';

@Component({
	selector: 'app-banda',
	templateUrl: './banda.component.html',
	styleUrls: ['./banda.component.css'],
	animations: [fadeIn, hoverAnimation],
})
export class BandaComponent implements OnInit {
	@Input() bandas: Banda[] = [];
	filtro: string = '';
	isHovered: number | null = null;
	page = 1;
	pageSize = 20;
	hasMoreData = true;
	scrollDistance = 2;
	scrollUpDistance = 1.5;
	imagemNaoEncontrada = '../../../../assets/Icons/nao-encontrado.png';
	read = true;
	addBanda = false;

	constructor(private service: DataService) {}
	ngOnInit(): void {
		this.carregarBandas();
	}

	carregarBandas() {
		this.service.getBandas(this.page, this.filtro).subscribe((x) => {
			this.bandas = this.bandas.concat(x);

			if (x.length < this.pageSize) {
				this.hasMoreData = false;
			}
		});
	}

	onMouseOver(index: number) {
		this.isHovered = index;
	}

	onMouseOut() {
		this.isHovered = null;
	}

	onScroll(): void {
		this.page++;
		this.carregarBandas();
	}
}
