import { Component, Input, OnInit } from '@angular/core';
import { fadeIn, hoverAnimation } from 'src/app/animations';
import { DataService } from 'src/app/services/data/data.service';
import { Banda } from './models/banda.model';
import { HandleService } from 'src/app/services/common/handle.service';
import { BandaService } from 'src/app/services/banda/banda.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-banda',
	templateUrl: './banda.component.html',
	styleUrls: ['./banda.component.css'],
	animations: [fadeIn, hoverAnimation],
})
export class BandaComponent implements OnInit {
	bandas: Banda[] = [];
	listaSubscription = new Subscription();
	filtroSubscription = new Subscription();
	handler = this.handle;

	@Input() filtro: string = '';
	@Input() listar = true;
	@Input() add = false;
	@Input() edit = false;
	@Input() delete = false;
	@Input() search = false;

	page = 1;
	pageSize = 20;
	hasMoreData = true;
	scrollDistance = 2;
	scrollUpDistance = 1.5;

	constructor(
		private dataService: DataService,
		private handle: HandleService,
		private bandaService: BandaService
	) {
		this.listaSubscription = this.bandaService
			.obterAtualizacao()
			.subscribe(async () => {
				await this.recarregarLista();
			});

		this.filtroSubscription = this.dataService
			.obterFiltroNotification()
			.subscribe(async () => {
				this.filtro = this.dataService.obterFiltro();
				await this.recarregarLista();
			});
	}

	async ngOnInit(): Promise<void> {
		await this.carregarBandas();
	}

	private async recarregarLista() {
		return (
			await this.bandaService.getBandas(this.page, this.filtro)
		).subscribe((bandas) => {
			this.page = 1;
			this.bandas = [];
			this.hasMoreData = true;
			this.bandas = bandas;
		});
	}

	async carregarBandas() {
		return (
			await this.bandaService.getBandas(this.page, this.filtro)
		).subscribe((bandas) => {
			this.bandas = this.bandas.concat(bandas);

			if (bandas.length < this.pageSize) {
				this.hasMoreData = false;
			}
		});
	}

	onScroll(): void {
		this.page++;
		this.carregarBandas();
	}

	idSelecionado(id?: number) {
		console.log('Este é o ID selecionado: ' + id);
		this.dataService.armazenaIdSelecionado(id);
	}
}
