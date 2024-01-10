import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {
	CreateMusicaDto,
	EditMusicaDto,
} from 'src/app/components/filtro/musica/interfaces/musica.interface';
import { Musica } from 'src/app/components/filtro/musica/models/musica.model';

@Injectable({
	providedIn: 'root',
})
export class MusicaService {
	private readonly API = 'https://localhost:7049/api/Musica';

	constructor(
		private readonly http: HttpClient,
		private toastr: ToastrService
	) {}

	listarTopFive(): Observable<Musica[]> {
		return this.http.get<Musica[]>(`${this.API}/listarTopFive`);
	}

	onAdd(musica: CreateMusicaDto) {
		return this.http.post<Musica>(`${this.API}/adicionarMusica`, musica);
	}

	getForId(id: number): Observable<Musica> {
		return this.http.get<Musica>(`${this.API}/listar/${id}`);
	}

	onEdit(musica: EditMusicaDto): Observable<Musica> {
		return this.http.put<Musica>(`${this.API}/editar/${musica.id}`, musica)
			.pipe(
				tap(() => this.toastr.success('Música editada com sucesso', 'Sucesso')),
				catchError((error) => {
					console.log(error);
					return throwError(() => new Error('Algo deu errado e foi impossível realizar a requisição PUT'));
				})
			);
	}

	validateMusica(musica: CreateMusicaDto): boolean {
		if (!musica.nomeMusica.trim()) {
			this.toastr.warning(
				'O nome da música não pode ser vazío, por favor, informe um nome para à música.',
				'Atenção'
			);
			return false;
		}

		if (musica.duracao < 1) {
			this.toastr.warning(
				'A duração da música deve ser maior que 0(zero).',
				'Atenção'
			);
			return false;
		}

		if (!musica.nomeBanda.trim()) {
			this.toastr.warning('Você deve informar uma banda válida.', 'Atenção');
			return false;
		}

		if (!musica.nomeAlbum.trim()) {
			this.toastr.warning('Você deve informar um álbum válido.', 'Atenção');
			return false;
		}

		return true;
	}
}
