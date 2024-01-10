/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, tap } from 'rxjs';
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
	public listSubject = new Subject<any[]>();
	protected selectedId?: number = 0;

	constructor(private http: HttpClient, private toastr: ToastrService) {
		this.toastr.toastrConfig.preventDuplicates = true;
		this.toastr.toastrConfig.progressBar = true;
		this.toastr.toastrConfig.progressAnimation = 'decreasing';
	}

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
		return this.http
			.get<Musica[]>(url)
			.pipe(tap((musicas) => this.listSubject.next(musicas)));
	}

	getMusicaById(id: number): Observable<Musica> {
		return this.http.get<Musica>(`${this.musicaAPI}/listar/${id}`);
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

	// Métodos utilitários.
	armazenaIdSelecionado(id?: number) {
		this.selectedId = id;
	}

	obterIdSelecionado() {
		return this.selectedId;
	}

	validaRota(rota: string): boolean {
		if (
			rota === '/filtro/musicas' &&
			(!this.selectedId || this.selectedId === 0)
		) {
			this.toastr.error(
				'Não encontramos a música que deseja editar, por favor, selecione uma música e tente novamente',
				'Erro!'
			);
			return false;
		}

		if (
			rota === '/filtro/albuns' &&
			(!this.selectedId || this.selectedId === 0)
		) {
			this.toastr.error(
				'Não encontramos o álbum que deseja editar, por favor, selecione um álbum e tente novamente',
				'Erro!'
			);
			return false;
		}

		if (
			rota === '/filtro/bandas' &&
			(!this.selectedId || this.selectedId === 0)
		) {
			this.toastr.error(
				'Não encontramos a banda que deseja editar, por favor, selecione uma banda e tente novamente',
				'Erro!'
			);
			return false;
		}

		return true;
	}
}
