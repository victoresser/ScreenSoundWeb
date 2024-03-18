import { Component, Input } from '@angular/core';
import { Album } from '../model/album.model';
import { fadeIn, hoverAnimation } from 'src/app/animations';

@Component({
	selector: 'app-card-album',
	templateUrl: './card-album.component.html',
	styleUrl: './card-album.component.scss',
	animations: [hoverAnimation, fadeIn]
})
export class CardAlbumComponent {
	@Input() album!: Album;
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
