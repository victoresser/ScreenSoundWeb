import { Component, Input, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album/album.service';
import { Album } from './model/album.model';
import { fadeIn } from 'src/app/animations';

@Component({
	selector: 'app-album',
	templateUrl: './album.component.html',
	styleUrls: ['./album.component.css'],
	animations: [fadeIn],
})
export class AlbumComponent implements OnInit {
	@Input() albuns: Album[] = [];
	@Input() filtro: string = '';
	isHovered: number | null = null;
	imagemNaoEncontrada = '../../../../assets/Icons/nao-encontrado.png';

	constructor(private albumService: AlbumService) {}

	ngOnInit(): void {
		this.carregarAlbuns();
	}

	carregarAlbuns() {
		this.albumService
			.listar(this.filtro)
			.subscribe((album) => (this.albuns = album));
	}

	onMouseOver(index: number) {
		this.isHovered = index;
	}

	onMouseOut() {
		this.isHovered = null;
	}
}
