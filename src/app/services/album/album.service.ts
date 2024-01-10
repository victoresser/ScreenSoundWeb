import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, tap, throwError } from 'rxjs';
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
	constructor(private http: HttpClient, private toastr: ToastrService) {}

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
				return throwError(() => new Error('Algo deu errado e foi impossível realizar a requisição PUT'));
			})
		);
	}
}
