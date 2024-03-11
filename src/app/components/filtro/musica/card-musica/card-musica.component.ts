import { Component, Input } from '@angular/core';
import { Musica } from '../models/musica.model';
import { DataService } from 'src/app/services/data/data.service';
import { HandleService } from 'src/app/services/common/handle.service';
import { fadeIn, hoverAnimation } from 'src/app/animations';

@Component({
	selector: 'app-card-musica',
	templateUrl: './card-musica.component.html',
	styleUrls: ['./card-musica.component.css'],
	animations: [hoverAnimation, fadeIn]
})
export class CardMusicaComponent {
	@Input() musica!: Musica;
	@Input() index!: number;

	handler = this.handle;
	isHovered: number | null = null;
	imagemNaoEncontrada = '../../../../assets/Icons/nao-encontrado.png';

	constructor(
		private dataService: DataService,
		private handle: HandleService
	) {}

	onMouseOver(index: number) {
		this.isHovered = index;
	}

	onMouseOut() {
		this.isHovered = null;
	}

	idSelecionado(id?: number) {
		console.log('Este é o ID selecionado: ' + id);
		this.dataService.armazenaIdSelecionado(id);
	}

	tratarDisponibilidade(disponivel?: boolean): string {
		if (disponivel) {
			return 'Disponível no plano Basic';
		} else {
			return 'Disponível no plano Plus+';
		}
	}
}
