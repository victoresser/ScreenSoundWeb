import { CreateMusicaDto } from './../musica/interfaces/musica.interface';
import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { HandleService } from 'src/app/services/common/handle.service';
import { MusicaService } from 'src/app/services/musica/musica.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Musica } from '../musica/models/musica.model';
import { BandaService } from 'src/app/services/banda/banda.service';
import { AlbumService } from 'src/app/services/album/album.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrl: './add.component.css',
})
export class AddComponent implements OnInit {
	@ViewChild('form', { static: true })
	public form: FormGroup = new FormGroup({
		nome: new FormControl('', [Validators.required]),
		duracao: new FormControl('', [Validators.required]),
		banda: new FormControl('', [Validators.required]),
		album: new FormControl('', [Validators.required]),
		disponivel: new FormControl(false),
	});

	handler = this.handle;

	public musica: CreateMusicaDto = {
		nome: '',
		duracao: 0,
		banda: '',
		album: '',
		disponivel: false,
		imagem: '',
	};

	@Input() add = false;
	@Input() listar = true;
	@Input() rotaAtual?: string;
	@Output() addChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(
		private handle: HandleService,
		private musicaService: MusicaService,
		private bandaService: BandaService,
		private albumService: AlbumService,
		private toastr: ToastrService
	) {}

	ngOnInit(): void {
		this.form = new FormGroup({
			nome: new FormControl('', [Validators.required]),
			duracao: new FormControl('', [Validators.required]),
			banda: new FormControl('', [Validators.required]),
			album: new FormControl('', [Validators.required]),
			disponivel: new FormControl(false),
		});
	}

	onAddChange() {
		this.add = !this.add;
		this.addChange.emit(this.add);
	}

	onAddMusica(musica: CreateMusicaDto): void {
		if (!musica.nome.trim()) {
			this.toastr.warning(
				'O nome da música não pode ser vazío, por favor, informe um nome para à música.',
				'Atenção'
			);
			this.onAddChange();
			return;
		}

		if (!musica.banda.trim()) {
			this.toastr.warning('Você deve informar uma banda válida.', 'Atenção');
			this.onAddChange();
			return;
		}

		if (!musica.album.trim()) {
			this.toastr.warning('Você deve informar um álbum válido.', 'Atenção');
			this.onAddChange();
			return;
		}

		if (musica.duracao < 1) {
			this.toastr.warning(
				'A duração da música deve ser maior que 0(zero).',
				'Atenção'
			);
			this.onAddChange();
			return;
		}

		const newMusic: Musica = {
			nome: musica.nome,
			duracao: musica.duracao,
			disponivel: musica.disponivel,
			banda: musica.banda,
			album: musica.album,
		};

		this.musicaService.addMusic(newMusic);
		this.toastr.success('Música adicionada com sucesso!', 'Sucesso');
		this.onAddChange();
	}
}
