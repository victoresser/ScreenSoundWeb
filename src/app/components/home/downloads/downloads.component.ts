import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-downloads',
	templateUrl: './downloads.component.html',
	styleUrls: ['./downloads.component.css'],
})
export class DownloadsComponent {
	constructor(private toastr: ToastrService) {}

	operatingSystems = [
		{ name: 'Windows', platform: 'Windows', icon: '../../../assets/Icons/Windows_white.png' },
		{ name: 'MacOS', platform: 'MacOS', icon: '../../../assets/Icons/apple-white.png' },
		{ name: 'Linux', platform: 'Linux', icon: '../../../assets/Icons/linux-white.png' },
	];

	getAgradecimento() {
		const agradecimento = `Obrigado por escolher o nosso software
		para realizar a gestão de suas músicas! Se você tiver alguma
		dúvida ou precisar de ajuda, estamos à disposição para te
		ajudar. Caso tenha encontrado um erro no programa, por favor
		envie uma mensagem com o relatório do erro e informações sobre como
		aconteceu.`;
		return this.toastr.info(agradecimento, 'Obrigado!', {});
	}
}
