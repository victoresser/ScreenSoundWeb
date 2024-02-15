import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import {
	CreateAlbumDto,
	EditAlbumDto,
} from 'src/app/components/filtro/album/interfaces/album.interface';
import { Album } from 'src/app/components/filtro/album/model/album.model';

@Injectable({
	providedIn: 'root',
})
export class AlbumService {
	private API = 'https://localhost:7049/api/Album';
	private listaSubject = new Subject<void>();
	private pageSize = 20;

	constructor(private http: HttpClient, private toastr: ToastrService) {}

	async getAlbuns(page: number, filtro?: string): Promise<Observable<Album[]>> {
		const skip = (page - 1) * this.pageSize;
		let params = new HttpParams().set('skip', skip).set('take', this.pageSize);

		if (filtro) {
			params = params.set('nomeAlbum', filtro);
		}

		return this.http.get<Album[]>(`${this.API}/listar`, { params: params });
	}

	getTopFive(): Observable<Album[]> {
		return this.http.get<Album[]>(`${this.API}/listarTopFive`);
	}

	onAdd(album: CreateAlbumDto): Observable<Album> {
		return this.http.post<Album>(`${this.API}/adicionarAlbum`, album).pipe(
			tap(() => {
				this.toastr.success('Álbum adicionado com sucesso', 'Sucesso');
				this.notificarAtualizacao();
			})
		);
	}

	onEdit(album: EditAlbumDto): Observable<Album> {
		return this.http.put<Album>(`${this.API}/editar/${album.id}`, album).pipe(
			tap(() => {
				this.toastr.success('Album editado com sucesso', 'Sucesso');
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
		window.confirm('Tem certeza que deseja excluir esta banda?');
		return this.http.delete<Album>(`${this.API}/excluir/${id}`).pipe(
			tap(() => {
				this.toastr.success('Album excluído com sucesso!', 'Atenção');
				this.notificarAtualizacao();
			}),
			catchError((err) => {
				const errorMessage = `Erro ao tentar deletar o álbum do id ${id}`;
				this.toastr.warning(errorMessage, 'Error');
				return throwError(err);
			})
		);
	}

	private notificarAtualizacao() {
		this.listaSubject.next();
	}

	public obterAtualizacao() {
		return this.listaSubject.asObservable();
	}
}
