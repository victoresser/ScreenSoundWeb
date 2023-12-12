import { CreateMusicaDto } from './musica/interfaces/musica.interface';
import { RouteChangeService } from 'src/app/services/routes/route-change.service';
import { Component, Input, OnInit } from '@angular/core';
import { MusicaComponent } from './musica/musica.component';
import { ActivatedRoute } from '@angular/router';
import { Banda } from './banda/banda.model';
import { Album } from './album/album.model';

@Component({
	selector: 'app-filtro',
	templateUrl: './filtro.component.html',
	styleUrls: ['./filtro.component.css'],
})
export class FiltroComponent implements OnInit{
	rotaAtual: string = '';
	add = false;
	edit = false;
	delete = false;
	search = false;
	@Input() musica: CreateMusicaDto = {
		nome: '',
		duracao: 1,
		disponivel: true,
		banda: new Banda,
		album: new Album
	}

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.rotaAtual = this.route.snapshot.url[0].path;
		this.route.paramMap.subscribe(params => {
			const rotaAtual = params.get(this.rotaAtual);
		});
	}

	adicionar() {
		if (this.rotaAtual === '/musicas') {
			this.add = true;
		}

		if (this.rotaAtual === '/albuns') {

		}

		if (this.rotaAtual === '/bandas') {

		}
	}

	editar(): void {}

	excluir(): void {}

	pesquisar(): void {}
}
