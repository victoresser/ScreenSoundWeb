import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import {
	CreateMusicaDto,
	EditMusicaDto,
} from 'src/app/components/filtro/musica/interfaces/musica.interface';
import { Musica } from 'src/app/components/filtro/musica/models/musica.model';
import { DataService } from '../data/data.service';

@Injectable({
	providedIn: 'root',
})
export class MusicaService {
	private readonly API = 'https://localhost:7049/api/Musica';
	public musicas: Musica[] = [];
	private listaAtualizada = new Subject<void>();
	public musicaEditada = false;
	private pageSize = 20;

	constructor(
		private readonly http: HttpClient,
		private toastr: ToastrService,
		private dataService: DataService
	) {}

	async getMusicas(
		page: number,
		filtro?: string
	): Promise<Observable<Musica[]>> {
		const skip = (page - 1) * this.pageSize;
		let params = new HttpParams().set('skip', skip).set('take', this.pageSize);

		if (filtro) {
			params = params.set('nomeMusica', filtro);
		}

		const url = `${this.API}/listar?${params}`;
		return this.http.get<Musica[]>(url);
	}

	getTopFive(): Observable<Musica[]> {
		return this.http.get<Musica[]>(`${this.API}/listarTopFive`).pipe(
			tap((musicas: Musica[]) => {
				this.dataService.listSubject.next(musicas);
				this.notificarAtualizacao();
			})
		);
	}

	getForId(id: number): Observable<Musica> {
		return this.http.get<Musica>(`${this.API}/listar/${id}`).pipe(
			tap(() => {
				this.notificarAtualizacao();
			})
		);
	}

	async onAdd(musica: CreateMusicaDto) {
		return this.http.post<Musica>(`${this.API}/adicionarMusica`, musica).pipe(
			tap(() => {
				this.toastr.success('Música adicionada com sucesso', 'Sucesso');
				this.notificarAtualizacao();
			}),
			catchError((error) => {
				console.log(error);
				this.toastr.error('Houve um problema para adicionar esta música', 'Erro');
				return error;
			})
		);
	}

	async onEdit(musica: EditMusicaDto) {
		return this.http
			.put<Musica>(`${this.API}/editar/${musica.id}`, musica)
			.pipe(
				tap(() => {
					this.toastr.success('Música editada com sucesso', 'Sucesso');
					this.notificarAtualizacao();
				}),
				catchError((error) => {
					console.log(error);
					return throwError(
						() =>
							new Error(
								'Algo deu errado e foi impossível realizar a requisição PUT'
							)
					);
				})
			);
	}

	async onDelete(id: number) {
		return this.http.delete<Musica>(`${this.API}/deletar/${id}`).pipe(
			tap(() => {
				this.toastr.info(
					`A música de id ${id} foi excluida`,
					'Música removida'
				);
				this.notificarAtualizacao();
			})
		);
	}

	private notificarAtualizacao() {
		this.listaAtualizada.next();
	}

	obterAtualizacao(): Observable<void> {
		return this.listaAtualizada.asObservable();
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
