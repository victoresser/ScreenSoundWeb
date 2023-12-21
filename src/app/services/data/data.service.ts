import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from 'src/app/components/filtro/album/model/album.model';
import { Banda } from 'src/app/components/filtro/banda/models/banda.model';
import { Musica } from 'src/app/components/filtro/musica/models/musica.model';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private musicaAPI = 'https://localhost:7049/api/Musica';
	private albumAPI = 'https://localhost:7049/api/Album';
	private bandaAPI = 'https://localhost:7049/api/Banda';
	private pageSize = 20;

	constructor(private http: HttpClient) {}

	// Requisições de Músicas
	getMusicas(page: number, filtro?: string): Observable<Musica[]> {
		const skip = (page - 1) * this.pageSize;
		const params = new HttpParams()
			.set('skip', skip.toString())
			.set('take', this.pageSize.toString());

		if (filtro) {
			params.set('nomeMusica', filtro);
		}
		const url = `${this.musicaAPI}/listar?${params}`;
		return this.http.get<Musica[]>(url);
	}

	// Requisições de Álbuns
	getBandas(page: number, filtro?: string): Observable<Banda[]> {
		const skip = (page - 1) * this.pageSize;
		const params = new HttpParams()
			.set('skip', skip.toString())
			.set('take', this.pageSize.toString());

		if (filtro) {
			params.set('nomeBanda', filtro);
		}
		const url = `${this.bandaAPI}/listar?${params}`;
		return this.http.get<Banda[]>(url);
	}

	// Requisições de Bandas
	getAlbuns(page: number, filtro?: string): Observable<Album[]> {
		const skip = (page - 1) * this.pageSize;
		const params = new HttpParams()
			.set('skip', skip.toString())
			.set('take', this.pageSize.toString());

		if (filtro) {
			params.set('nomeMusica', filtro);
		}
		const url = `${this.albumAPI}/listar?${params}`;
		return this.http.get<Album[]>(url);
	}
}
