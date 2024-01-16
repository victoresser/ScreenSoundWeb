import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Musica } from './models/musica.model';
import { HandleService } from 'src/app/services/common/handle.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { DataService } from 'src/app/services/data/data.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-musica',
	templateUrl: './musica.component.html',
	styleUrls: ['./musica.component.css'],
})
export class MusicaComponent implements OnInit, OnDestroy {
	@Input() musicas: Musica[] = [];
	listaSubscription = new Subscription();
	filtroSubscription = new Subscription();

	@Input() filtro: string = '';
	@Input() listar = true;
	@Input() add = false;
	@Input() edit = false;
	@Input() delete = false;
	@Input() search = false;

	isHovered: number | null = null;
	page = 1;
	pageSize = 20;
	hasMoreData = true;
	scrollDistance = 2;
	scrollUpDistance = 1.5;
	imagemNaoEncontrada = '../../../../assets/Icons/nao-encontrado.png';
	handler = this.handle;

	constructor(
		private musicaService: MusicaService,
		private handle: HandleService,
		private dataService: DataService
	) {
		this.listaSubscription = this.musicaService
			.obterAtualizacao()
			.subscribe(async () => {
				await this.recarregarLista();
			});

		this.filtroSubscription = this.dataService
			.obterFiltroNotification()
			.subscribe(async () => {
				this.page = 1;
				this.filtro = this.dataService.obterFiltro();
				await this.recarregarLista();
			});
	}

	async ngOnInit(): Promise<void> {
		await this.carregarMusicas();
	}

	ngOnDestroy(): void {
		this.listaSubscription.unsubscribe();
	}

	async recarregarLista() {
		(await this.musicaService.getMusicas(this.page, this.filtro)).subscribe(
			(musicas) => {
				this.page = 1;
				this.musicas = [];
				this.hasMoreData = true;
				this.musicas = musicas;
			}
		);
	}

	async carregarMusicas() {
		(await this.musicaService.getMusicas(this.page, this.filtro)).subscribe(
			(musicas) => {
				this.musicas = this.musicas.concat(musicas);

				if (musicas.length < this.pageSize) {
					this.hasMoreData = false;
				}
			}
		);
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
		console.log(`Página: ${this.page}`);
		this.carregarMusicas();
	}

	idSelecionado(id?: number) {
		console.log('Este é o ID selecionado: ' + id);
		this.dataService.armazenaIdSelecionado(id);
	}
}
