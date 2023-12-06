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

  listar(filtro: string): Observable<Musica[]> {
    let params = new HttpParams();

    if (filtro.trim().length > 2) {
      params = params.set('?nomeMusica=', filtro);
    }

    return this.http.get<Musica[]>(`${this.API}/listar`, { params });
  }

	addMusic(musica: Musica): Observable<Musica> {
		return this.http.post<Musica>(this.API, Musica);
	}

	editMusic() {}
}
