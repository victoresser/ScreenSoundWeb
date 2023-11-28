import { HttpResponse } from '@angular/common/http';
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
	pageSize = 20;
	hasMoreData = true;
	scrollDistance = 2;
	scrollUpDistance = 1.5;

	constructor(private service: DataService) {}

	ngOnInit(): void {
		this.carregarMusica();
	}

	ngOnChange(): void {
		this.page = 1;
		this.musicas = [];
		this.carregarMusica();
	}

	carregarMusica() {
		this.service.getMusicas(this.page, this.filtro).subscribe(musicas => {
			this.musicas = this.musicas.concat(musicas);

			if (musicas.length < this.pageSize) {
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
		this.carregarMusica();
	}
}
