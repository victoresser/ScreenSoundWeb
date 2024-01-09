import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musica } from 'src/app/components/filtro/musica/models/musica.model';

@Injectable({
	providedIn: 'root',
})
export class MusicaService {
	private API = 'https://localhost:7049/api/Musica';

	constructor(private http: HttpClient) {}

	listarTopFive(): Observable<Musica[]> {
		return this.http.get<Musica[]>(`${this.API}/listarTopFive`);
	}

	addMusic(musica: Musica): Observable<Musica> {
		const params = new HttpParams()
			.set('nomeMusica', musica.nome)
			.set('duracaoMusica', musica.duracao)
			.set('disponibilidadeMusica', musica.disponivel)
			.set('nomeBanda', musica.banda)
			.set('nomeAlbum', musica.album);

			console.log(`${this.API}/adicionarMusica?` + `${params}`);

		return this.http.post<Musica>(`${this.API}/adicionarMusica?`, { params: params });
	}

	getForId(id: number): Observable<Musica> {
		return this.http.get<Musica>(`${this.API}/listar/${id}`);
	}

	editMusic(id: number): Observable<Musica> {
		return this.http.put<Musica>(`${this.API}/editar/${id}`, id);
	}
}
