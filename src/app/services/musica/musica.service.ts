import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musica } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MusicaService {
  private API = 'https://localhost:7049/api/Musica';

  constructor(private http: HttpClient) {}

  listarTopFive(): Observable<Musica[]> {
    const itensPorPagina = 5;

    let params = new HttpParams().set('_limit', itensPorPagina);

    return this.http.get<Musica[]>(`${this.API}/listar`, { params });
  }

  listarMusicas(paginas: number, filtro: string): Observable<Musica[]> {
    const itensPorPagina = 9;

    let params = new HttpParams()
      .set('_page', paginas)
      .set('_limit', itensPorPagina);

    if (filtro.trim().length > 2) {
      params = params.set('q', filtro);
    }

    return this.http.get<Musica[]>(`${this.API}/listar`, { params });
  }
}
