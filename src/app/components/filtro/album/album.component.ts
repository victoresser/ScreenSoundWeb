import { Component, Input, OnInit } from '@angular/core';
import { Album } from './model/album.model';
import { fadeIn } from 'src/app/animations';
import { DataService } from 'src/app/services/data/data.service';

@Component({
	selector: 'app-album',
	templateUrl: './album.component.html',
	styleUrls: ['./album.component.css'],
	animations: [fadeIn],
})
export class AlbumComponent implements OnInit {
	albuns: Album[] = [];

	@Input() filtro: string = '';
	@Input() listar = true;
	@Input() add = false;
	@Input() edit = false;
	@Input() delete = false;
	@Input() search = false;

	page = 1;
	pageSize = 20;
	hasMoreData = true;
	isHovered: number | null = null;
	imagemNaoEncontrada = '../../../../assets/Icons/nao-encontrado.png';

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.carregarAlbuns();
	}

	carregarAlbuns() {
		this.dataService
			.getAlbuns(1, this.filtro)
			.subscribe((album) => {
				this.albuns = this.albuns.concat(album);

				if (album.length < this.pageSize) {
					this.hasMoreData = false;
				}
			});
	}

	onMouseOver(index: number) {
		this.isHovered = index;
	}

	onMouseOut() {
		this.isHovered = null;
	}
}
