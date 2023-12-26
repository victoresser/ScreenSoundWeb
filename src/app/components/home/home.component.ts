import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../filtro/album/model/album.model';
import { Banda } from '../filtro/banda/models/banda.model';
import { Musica } from '../filtro/musica/models/musica.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
