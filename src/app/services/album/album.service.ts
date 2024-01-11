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
	private albumSubject = new Subject<Album>();
	private albunsSubject = new Subject<Album[]>();
	private pageSize = 20;

	constructor(private http: HttpClient, private toastr: ToastrService) {}

	getAlbuns(page: number, filtro?: string): Observable<Album[]> {
		const skip = (page - 1) * this.pageSize;
		const params = new HttpParams()
			.set('skip', skip.toString())
			.set('take', this.pageSize.toString());

		if (filtro) {
			params.set('nomeMusica', filtro);
		}
		const url = `${this.API}/listar?${params}`;
		return this.http.get<Album[]>(url);
	}

	getTopFive(): Observable<Album[]> {
		return this.http.get<Album[]>(`${this.API}/listarTopFive`);
	}

	onAdd(album: CreateAlbumDto): Observable<Album> {
		return this.http.post<Album>(`${this.API}/adicionarAlbum`, album);
	}

	onEdit(album: EditAlbumDto): Observable<Album> {
		return this.http.put<Album>(`${this.API}/editar/${album.id}`, album).pipe(
			tap(() => this.toastr.success('Album editado com sucesso', 'Sucesso')),
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

	onDelete(id: number) {
		return this.http.delete<Album>(`${this.API}/excluir/${id}`).pipe(
			tap(() => this.toastr.warning('Album excluído com sucesso!', 'Atenção')),
			catchError((err) => {
				const errorMessage = `Erro ao tentar deletar o álbum do id ${id}`;
				this.toastr.warning(errorMessage, 'Error')
				return throwError(err);
			})
		);
	}
}
