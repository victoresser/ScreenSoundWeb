import { RouteChangeService } from 'src/app/services/routes/route-change.service';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { MusicaComponent } from './musica/musica.component';

@Component({
	selector: 'app-filtro',
	templateUrl: './filtro.component.html',
	styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent implements OnInit {
	rotaAtual: string = '';

	constructor(
		private routeChangeService: RouteChangeService,
		private musica: MusicaComponent
	) {}

	ngOnInit() {
		this.routeChangeService.getRouteChangeObservable().subscribe((rota) => {
			this.rotaAtual = rota;
		});
	}

	adicionar(route: string): void {
		this.musica.adicionar = true;
		this.musica.listarAberta = false;
	}

	editar(): void {}

	excluir(): void {}

	pesquisar(): void {}
}
