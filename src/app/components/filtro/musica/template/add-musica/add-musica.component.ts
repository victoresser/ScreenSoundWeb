import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicaService } from 'src/app/services/musica/musica.service';

@Component({
	selector: 'app-add-musica',
	standalone: true,
	imports: [],
	templateUrl: './add-musica.component.html',
	styleUrl: './add-musica.component.css',
})
export class AddMusicaComponent {
	valid = true;

	form: FormGroup = this.formBuilder.group({
		id: [0],
		nome: ['', [Validators.required, Validators.minLength(2)]],
		duracao: [0, [Validators.required, Validators.min(3)]],
		disponivel: [true],
		artista: ['', Validators.required],
		album: ['', Validators.required],
	});

	constructor(
		private formBuilder: FormBuilder,
		private service: MusicaService
	) {}

	onSubmit() {}
}
