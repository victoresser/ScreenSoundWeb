import { fadeIn, hoverAnimation } from 'src/app/animations';
import { Banda } from './../models/banda.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-banda',
  templateUrl: './card-banda.component.html',
  styleUrl: './card-banda.component.css',
	animations: [hoverAnimation, fadeIn]
})
export class CardBandaComponent {

	@Input() banda!: Banda;
	@Input() index!: number;

	isHovered: number | null = null;
	imagemNaoEncontrada = '../../../../assets/Icons/nao-encontrado.png';

	constructor() {}

	onMouseOver(index: number) {
		this.isHovered = index;
	}

	onMouseOut() {
		this.isHovered = null;
	}

}
