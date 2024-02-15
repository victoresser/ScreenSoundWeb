import { Component } from '@angular/core';

@Component({
	selector: 'app-carrossel',
	templateUrl: './carrossel.component.html',
	styleUrls: ['./carrossel.component.css'],
})
export class CarrosselComponent {
	imagens = [
		{
			src: '../../../assets/foto1__carrossel.png',
		},
		{
			src: '../../../assets/foto2__carrossel.png',
		},
		{
			src: '../../../assets/foto3__carrossel.png',
		},
		{
			src: '../../../assets/foto4__carrossel.png',
		},
	];
}
