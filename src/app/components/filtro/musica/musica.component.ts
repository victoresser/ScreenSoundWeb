import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Musica } from './models/musica.model';
import { HandleService } from 'src/app/services/common/handle.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { DataService } from 'src/app/services/data/data.service';
import { Subscription, debounceTime } from 'rxjs';

@Component({
	selector: 'app-musica',
	templateUrl: './musica.component.html',
	styleUrls: ['./musica.component.css'],
})
export class MusicaComponent implements OnInit, OnDestroy {
	@Input() musicas: Musica[] = [];
	statusLista = new Subscription();

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
	) {}

	async ngOnInit(): Promise<void> {
		await this.carregarMusica();

		this.statusLista = this.musicaService
			.obterAtualizacao()
			.pipe(debounceTime(300))
			.subscribe(() => {
				if (this.musicas.length === 0) {
					this.musicas = [];
					this.carregarMusica();
				}
			});
	}

	ngOnDestroy(): void {
		this.statusLista.unsubscribe();
	}

	async carregarMusica() {
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
		this.carregarMusica();
	}

	idSelecionado(id?: number) {
		console.log('Este é o ID selecionado: ' + id);
		this.dataService.armazenaIdSelecionado(id);
	}
}
