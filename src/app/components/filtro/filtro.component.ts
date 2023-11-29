import { RouteChangeService } from 'src/app/services/routes/route-change.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-filtro',
	templateUrl: './filtro.component.html',
	styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent implements OnInit {
	rotaAtual: string = '';

	constructor(private routeChangeService: RouteChangeService) {}

	ngOnInit() {
		this.routeChangeService.getRouteChangeObservable().subscribe((rota) => {
			this.rotaAtual = rota;
		});
	}

	adicionar(): void {}

	editar(): void {}

	excluir(): void {}

	pesquisar(): void {}
}
