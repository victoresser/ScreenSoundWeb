import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Musica } from './models/musica.model';
import { FiltroComponent } from '../filtro.component';

@Component({
	selector: 'app-musica',
	templateUrl: './musica.component.html',
	styleUrls: ['./musica.component.css'],
})
export class MusicaComponent {
	musicas: Musica[] = [];
	@Input() filtro: string = '';
	@Input() listar: boolean = true;
	@Input() add = false;
	@Input() edit = false;
	@Input() delete = false;
	@Input() search = false;
	filtroComp = this.filtroComponent;
	isHovered: number | null = null;
	page = 1;
	pageSize = 20;
	hasMoreData = true;
	scrollDistance = 2;
	scrollUpDistance = 1.5;
	imagemNaoEncontrada = '../../../../assets/Icons/nao-encontrado.png';

	constructor(private service: DataService, private filtroComponent: FiltroComponent) {
	}

	ngOnInit(): void {
		this.carregarMusica();
	}

	carregarMusica() {
		this.service.getMusicas(this.page, this.filtro).subscribe((x) => {
			this.musicas = this.musicas.concat(x);

			if (x.length < this.pageSize) {
				this.hasMoreData = false;
			}
		});
	}

	tratarDisponibilidade(disponivel?: boolean): string {
		if (disponivel) {
			return 'Disponível no plano basic';
		} else {
			return 'Disponível no plano Plus+';
		}
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
