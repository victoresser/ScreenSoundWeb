import { RouteChangeService } from 'src/app/services/routes/route-change.service';
import { Component } from '@angular/core';
import { MusicaComponent } from './musica/musica.component';

@Component({
	selector: 'app-filtro',
	templateUrl: './filtro.component.html',
	styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent {
	rotaAtual: string = '';

	constructor(
		private routeChangeService: RouteChangeService,
		private musica: MusicaComponent
	) {}

	adicionar(route: string): void {
		this.musica.adicionar = true;
		this.musica.read = false;
	}

	editar(): void {}

	excluir(): void {}

	pesquisar(): void {}
}
